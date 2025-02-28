export const  formated12HoursTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

export const formatedDate = (timestamp) =>{
        const date = new Date(timestamp * 1000); 
        return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}
export function transformDateFormat() {
    const date = new Date();
    const month = date.toLocaleString('en-US', { month: '2-digit' });
    const day = date.toLocaleString('en-US', { day: '2-digit' });
    const year = date.getFullYear();
    const time = date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    });
  
    const newFormatDate = year.toString().concat('-', month, '-', day, ' ', time);
    return newFormatDate;
  }

  export const GetWeekDay = (dateString) =>{
    const date = new Date(dateString);
    const options = { weekday: 'long' };
    return date.toLocaleDateString('en-US', options);
  }