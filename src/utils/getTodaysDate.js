export const getTodaysDate = () => {
  const months = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ];

  let today = new Date();
  return (
    today.getDate() + '-' + months[today.getMonth()] + '-' + today.getFullYear()
  );
};
