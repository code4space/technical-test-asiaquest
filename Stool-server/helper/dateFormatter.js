function formatDate(dateString) {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const date = new Date(dateString);
  
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();

  const formattedDate = `${day} ${month} ${year}, ${hour.toString().padStart(2, '0')}.${minute.toString().padStart(2, '0')}`;

  return formattedDate + ' WIB';
}

module.exports = formatDate