export const fetchStatsData = async () => {
    const res = await fetch('/data/statsData.json');
    return await res.json();
  };
  
  export const fetchOrdersData = async () => {
    const res = await fetch('/data/ordersData.json');
    return await res.json();
  };
  