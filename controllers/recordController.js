const financeService = require('../services/financeService');

exports.createRecord = async (req, res) => {
  try {
    const record = await financeService.createRecord(req.user.id, req.body);
    res.status(201).json({
      success: true,
      message: 'Record created successfully',
      data: record,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getRecords = async (req, res) => {
  try {
    const filters = {
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      category: req.query.category,
      type: req.query.type,
      limit: parseInt(req.query.limit) || 20,
      skip: parseInt(req.query.skip) || 0,
    };

    const { records, total, limit, skip } = await financeService.getRecords(
      req.user.id,
      filters
    );

    res.json({
      success: true,
      data: records,
      pagination: {
        total,
        limit,
        skip,
        hasMore: skip + limit < total,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getRecordById = async (req, res) => {
  try {
    const record = await financeService.getRecordById(req.params.id, req.user.id);
    res.json({
      success: true,
      data: record,
    });
  } catch (error) {
    if (error.message === 'Record not found') {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    if (error.message === 'Access denied') {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateRecord = async (req, res) => {
  try {
    const record = await financeService.updateRecord(req.params.id, req.user.id, req.body);
    res.json({
      success: true,
      message: 'Record updated successfully',
      data: record,
    });
  } catch (error) {
    if (error.message === 'Record not found') {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    if (error.message === 'Access denied') {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    await financeService.deleteRecord(req.params.id, req.user.id);
    res.json({
      success: true,
      message: 'Record deleted successfully',
    });
  } catch (error) {
    if (error.message === 'Record not found') {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
    if (error.message === 'Access denied') {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
