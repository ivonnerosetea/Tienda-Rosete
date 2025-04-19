// Artículos color favorito
let currentPage = 1;
const totalPages = 3;

function showPage(n) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById('page' + n).classList.add('active');
}

function nextPage() {
  currentPage = currentPage < totalPages ? currentPage + 1 : 1;
  showPage(currentPage);
}

function prevPage() {
  currentPage = currentPage > 1 ? currentPage - 1 : totalPages;
  showPage(currentPage);
}

document.querySelectorAll('.heart').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.style.color = btn.style.color === 'gray' ? '#dc3545' : 'gray';
  });
}); 