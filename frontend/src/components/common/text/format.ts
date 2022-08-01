export const formatFromTimestamp = (timestamp: string | Date) => {

  let d;
  if (timestamp instanceof Date) {
    d = timestamp;
  } else {
    d = new Date(timestamp);
  }
  
  const dformat = [d.getMonth()+1,
    d.getDate(),
    d.getFullYear()].join('-')+' '+
                [d.getHours() < 10 ? '0'+d.getHours() : d.getHours(),
                  d.getMinutes() < 10 ? '0'+d.getMinutes() : d.getMinutes(),
                  d.getSeconds() < 10 ? '0'+d.getSeconds() : d.getSeconds(),
                ].join(':');
  
  return dformat;
};