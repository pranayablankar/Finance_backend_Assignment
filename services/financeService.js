const FinancialRecord = require('../models/FinancialRecord');

class FinanceService {
  async createRecord(userId, recordData) {
    const record = new FinancialRecord({
      ...recordData,
      createdBy: userId,
    });
    return await record.save();
  }

  async getRecords(userId, filters = {}) {
    const query = {
      createdBy: userId,
      isDeleted: false,
    };

    if (filters.startDate || filters.endDate) {
      query.date = {};
      if (filters.startDate) {
        query.date.$gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        query.date.$lte = new Date(filters.endDate);
      }
    }

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.type) {
      query.type = filters.type;
    }

    const limit = Math.min(filters.limit || 20, 100);
    const skip = filters.skip || 0;

    const records = await FinancialRecord.find(query)
      .sort({ date: -1 })
      .limit(limit)
      .skip(skip)
      .exec();

    const total = await FinancialRecord.countDocuments(query);

    return { records, total, limit, skip };
  }

  async getRecordById(recordId, userId) {
    const record = await FinancialRecord.findById(recordId);
    
    if (!record) {
      throw new Error('Record not found');
    }

    if (record.createdBy.toString() !== userId.toString()) {
      throw new Error('Access denied');
    }

    return record;
  }

  async updateRecord(recordId, userId, updateData) {
    const record = await this.getRecordById(recordId, userId);
    
    Object.assign(record, updateData);
    return await record.save();
  }

  async deleteRecord(recordId, userId) {
    const record = await this.getRecordById(recordId, userId);
    record.isDeleted = true;
    return await record.save();
  }

  async getSummary(userId) {
    const records = await FinancialRecord.find({
      createdBy: userId,
      isDeleted: false,
    });

    const summary = {
      totalIncome: 0,
      totalExpense: 0,
      netBalance: 0,
      categoryTotals: {},
      recordCount: records.length,
    };

    records.forEach((record) => {
      if (record.type === 'income') {
        summary.totalIncome += record.amount;
      } else {
        summary.totalExpense += record.amount;
      }

      if (!summary.categoryTotals[record.category]) {
        summary.categoryTotals[record.category] = {
          income: 0,
          expense: 0,
          total: 0,
        };
      }

      if (record.type === 'income') {
        summary.categoryTotals[record.category].income += record.amount;
      } else {
        summary.categoryTotals[record.category].expense += record.amount;
      }

      summary.categoryTotals[record.category].total += record.amount;
    });

    summary.netBalance = summary.totalIncome - summary.totalExpense;

    return summary;
  }

  async getMonthlyTrend(userId, months = 6) {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth() - months + 1, 1);

    const records = await FinancialRecord.find({
      createdBy: userId,
      isDeleted: false,
      date: { $gte: startDate },
    });

    const trend = {};

    records.forEach((record) => {
      const monthKey = record.date.toISOString().split('T')[0].slice(0, 7);

      if (!trend[monthKey]) {
        trend[monthKey] = {
          income: 0,
          expense: 0,
          balance: 0,
        };
      }

      if (record.type === 'income') {
        trend[monthKey].income += record.amount;
      } else {
        trend[monthKey].expense += record.amount;
      }

      trend[monthKey].balance = trend[monthKey].income - trend[monthKey].expense;
    });

    return trend;
  }

  async getRecentActivity(userId, limit = 10) {
    const records = await FinancialRecord.find({
      createdBy: userId,
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();

    return records;
  }
}

module.exports = new FinanceService();
