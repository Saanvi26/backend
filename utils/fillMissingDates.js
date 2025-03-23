const fillMissingDates = (data) => {
    if (data.length === 0) return [];
  
    const allDates = new Set(data.map(item => item.date));
  
    const startDate = new Date(Math.min(...data.map(d => new Date(d.date))));
    const endDate = new Date(Math.max(...data.map(d => new Date(d.date))));
  
    const filledData = [];
    let currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
  
      const existingEntry = data.find(item => item.date === dateStr);
      filledData.push({
        date: dateStr,
        solved: existingEntry ? existingEntry.solved : 0
      });
  
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return filledData;
  };
  
  module.exports = fillMissingDates;
  