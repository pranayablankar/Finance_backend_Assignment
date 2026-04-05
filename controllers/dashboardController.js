const financeService = require('../services/financeService');

exports.getSummary = async (req, res) => {
  try {
    const summary = await financeService.getSummary(req.user.id);
    res.json({
      success: true,
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMonthlyTrend = async (req, res) => {
  try {
    const months = parseInt(req.query.months) || 6;
    const trend = await financeService.getMonthlyTrend(req.user.id, months);
    
    res.json({
      success: true,
      data: trend,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getRecentActivity = async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const activity = await financeService.getRecentActivity(req.user.id, limit);
    
    res.json({
      success: true,
      data: activity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getDashboardData = async (req, res) => {
  try {
    const [summary, trend, activity] = await Promise.all([
      financeService.getSummary(req.user.id),
      financeService.getMonthlyTrend(req.user.id, 6),
      financeService.getRecentActivity(req.user.id, 10),
    ]);

    res.json({
      success: true,
      data: {
        summary,
        trend,
        activity,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
