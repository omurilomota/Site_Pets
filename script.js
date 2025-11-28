// ===== CONFIGURAÇÃO INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🐾 PetLove Premium carregado com sucesso!');
    
    // Inicializar todos os módulos
    initPreloader();
    initMobileMenu();
    initDarkMode();
    initBackToTop();
    initPetFilters();
    initFavorites();
    initPetSlider();
    initAdoptionCounter();
    initServiceBooking();
    initFormValidation();
    initFAQ();
    initSmoothScroll();
    initAnimations();
    initNewsletter();
  });
  
  // ===== PRELOADER =====
  function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 1500);
    });
  }
  
  // ===== MENU HAMBÚRGUER =====
  function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');
    
    // Criar overlay
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
  
    // Toggle menu
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navbar.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';
    });
  
    // Fechar ao clicar no overlay
    overlay.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navbar.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  
    // Fechar ao clicar em um link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navbar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  
  // ===== DARK MODE =====
  function initDarkMode() {
    const themeToggle = document.querySelector('.theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    // Verificar preferência salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      icon.classList.replace('fa-moon', 'fa-sun');
    }
  
    // Verificar preferência do sistema
    if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark-mode');
      icon.classList.replace('fa-moon', 'fa-sun');
    }
  
    // Toggle
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      
      if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
      } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
      }
    });
  }
  
  // ===== BOTÃO VOLTAR AO TOPO =====
  function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
  
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
  
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // ===== FILTROS E BUSCA DE PETS =====
  function initPetFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const petSlides = document.querySelectorAll('.pet-slide');
    const searchInput = document.querySelector('#pet-search');
  
    // Filtros
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Atualizar botão ativo
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
  
        const filter = button.getAttribute('data-filter');
        
        petSlides.forEach(slide => {
          if (filter === 'all' || slide.getAttribute('data-category') === filter) {
            slide.classList.remove('hidden');
          } else {
            slide.classList.add('hidden');
          }
        });
      });
    });
  
    // Busca
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      
      petSlides.forEach(slide => {
        const petName = slide.getAttribute('data-name').toLowerCase();
        
        if (petName.includes(searchTerm)) {
          slide.classList.remove('hidden');
        } else {
          slide.classList.add('hidden');
        }
      });
    });
  }
  
  // ===== SISTEMA DE FAVORITOS =====
  function initFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoritesCount = document.getElementById('favorites-count');
    
    // Atualizar contador
    if (favoritesCount) {
      favoritesCount.textContent = favorites.length;
    }
  
    // Botões de favorito
    document.querySelectorAll('.btn-favorite').forEach(button => {
      const petName = button.getAttribute('data-pet');
      
      // Verificar se já está nos favoritos
      if (favorites.includes(petName)) {
        button.classList.add('active');
        button.innerHTML = '<i class="fas fa-heart"></i>';
      }
  
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (favorites.includes(petName)) {
          // Remover dos favoritos
          favorites = favorites.filter(name => name !== petName);
          button.classList.remove('active');
          button.innerHTML = '<i class="far fa-heart"></i>';
        } else {
          // Adicionar aos favoritos
          favorites.push(petName);
          button.classList.add('active');
          button.innerHTML = '<i class="fas fa-heart"></i>';
        }
  
        // Salvar e atualizar contador
        localStorage.setItem('favorites', JSON.stringify(favorites));
        if (favoritesCount) {
          favoritesCount.textContent = favorites.length;
        }
  
        // Animação
        button.style.transform = 'scale(1.3)';
        setTimeout(() => button.style.transform = 'scale(1)', 200);
      });
    });
  }
  
  // ===== SLIDER DE PETS =====
  function initPetSlider() {
    const slides = document.querySelectorAll('.pet-slide');
    let currentSlide = 0;
  
    // Adicionar navegação automática (opcional)
    if (slides.length > 1) {
      setInterval(() => {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
      }, 5000);
    }
  }
  
  // ===== CONTADOR DE ADOÇÕES =====
  function initAdoptionCounter() {
    let contadorAdocoes = parseInt(localStorage.getItem('contadorAdocoes') || '0');
    const contadorElement = document.getElementById('contador');
    
    // Atualizar contador na página
    if (contadorElement) {
      contadorElement.textContent = contadorAdocoes;
    }
  
    // Botões de adoção
    document.querySelectorAll('.btn-adopt').forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const petName = this.getAttribute('data-name');
        
        // Animação do botão
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 200);
  
        // Incrementar contador
        contadorAdocoes++;
        if (contadorElement) {
          contadorElement.textContent = contadorAdocoes;
          // Animação do número
          contadorElement.style.transform = 'scale(1.5)';
          contadorElement.style.color = '#4ecdc4';
          setTimeout(() => {
            contadorElement.style.transform = 'scale(1)';
            contadorElement.style.color = '#ff6b6b';
          }, 300);
        }
        
        // Salvar no localStorage
        localStorage.setItem('contadorAdocoes', contadorAdocoes);
        
        // Mostrar mensagem de sucesso
        showNotification(`🎉 Parabéns! Você iniciou o processo de adoção de ${petName}!`, 'success');
      });
    });
  }
  
  // ===== SISTEMA DE AGENDAMENTO DE SERVIÇOS =====
  function initServiceBooking() {
    const agendarButtons = document.querySelectorAll('.btn-agendar');
    
    agendarButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const servico = this.getAttribute('data-servico');
        
        // Criar modal de agendamento
        createBookingModal(servico);
      });
    });
  }
  
  function createBookingModal(servico) {
    // Remover modal existente se houver
    const existingModal = document.getElementById('booking-modal');
    if (existingModal) {
      existingModal.remove();
    }
  
    // Criar novo modal
    const modal = document.createElement('div');
    modal.id = 'booking-modal';
    modal.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <button class="modal-close">&times;</button>
          <h3>Agendar: ${servico}</h3>
          <form id="booking-form">
            <input type="text" placeholder="Nome do Pet" required>
            <input type="text" placeholder="Seu Nome" required>
            <input type="tel" placeholder="Telefone" required>
            <input type="date" required>
            <select required>
              <option value="">Selecione o horário</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
            </select>
            <textarea placeholder="Observações (opcional)"></textarea>
            <button type="submit" class="btn-submit">Confirmar Agendamento</button>
          </form>
        </div>
      </div>
    `;
  
    // Adicionar estilos do modal
    const modalStyles = `
      <style>
        #booking-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 9999;
          animation: fadeIn 0.3s;
        }
  
        .modal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
  
        .modal-content {
          background: white;
          border-radius: 20px;
          padding: 30px;
          max-width: 500px;
          width: 100%;
          position: relative;
          animation: slideUp 0.3s;
        }
  
        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
  
        .modal-close {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          font-size: 30px;
          cursor: pointer;
          color: #999;
          transition: color 0.3s;
        }
  
        .modal-close:hover {
          color: #ff6b6b;
        }
  
        .modal-content h3 {
          color: #2c3e50;
          margin-bottom: 20px;
          font-size: 1.5rem;
        }
  
        #booking-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
  
        #booking-form input,
        #booking-form select,
        #booking-form textarea {
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }
  
        #booking-form input:focus,
        #booking-form select:focus,
        #booking-form textarea:focus {
          outline: none;
          border-color: #4ecdc4;
        }
  
        #booking-form textarea {
          min-height: 80px;
          resize: vertical;
        }
  
        .btn-submit {
          background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
          color: white;
          border: none;
          padding: 15px;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.3s;
        }
  
        .btn-submit:hover {
          transform: scale(1.05);
        }
      </style>
    `;
  
    // Adicionar modal ao DOM
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    document.body.appendChild(modal);
  
    // Fechar modal
    const closeButton = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeButton.addEventListener('click', () => modal.remove());
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) modal.remove();
    });
  
    // Processar formulário
    const bookingForm = modal.querySelector('#booking-form');
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Coletar dados do formulário
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Salvar agendamento no localStorage
      let agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');
      agendamentos.push({
        servico: servico,
        data: new Date().toISOString(),
        ...data
      });
      localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
      
      // Mostrar confirmação
      showNotification(`✅ Agendamento confirmado para ${servico}!`, 'success');
      
      // Fechar modal
      modal.remove();
    });
  }
  
  // ===== VALIDAÇÃO DO FORMULÁRIO DE ADOÇÃO =====
  function initFormValidation() {
    const form = document.getElementById('form-adocao');
    
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar campos
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const pet = document.getElementById('pet').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          showNotification('❌ Por favor, insira um email válido!', 'error');
          return;
        }
        
        // Validar nome (mínimo 3 caracteres)
        if (nome.length < 3) {
          showNotification('❌ O nome deve ter pelo menos 3 caracteres!', 'error');
          return;
        }
        
        // Salvar solicitação
        const solicitacao = {
          nome,
          email,
          pet,
          mensagem,
          data: new Date().toISOString()
        };
        
        let solicitacoes = JSON.parse(localStorage.getItem('solicitacoes') || '[]');
        solicitacoes.push(solicitacao);
        localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));
        
        // Mostrar sucesso
        showNotification('✅ Solicitação enviada com sucesso! Entraremos em contato em breve.', 'success');
        
        // Limpar formulário
        form.reset();
        
        // Animar formulário
        form.style.transform = 'scale(0.95)';
        setTimeout(() => {
          form.style.transform = 'scale(1)';
        }, 300);
      });
    }
  }
  
  // ===== FAQ ACCORDION =====
  function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('i');
        
        // Fechar outros itens
        faqQuestions.forEach(q => {
          if (q !== question) {
            q.classList.remove('active');
            q.nextElementSibling.classList.remove('active');
          }
        });
        
        // Toggle atual
        question.classList.toggle('active');
        answer.classList.toggle('active');
        
        // Scroll suave para o item
        setTimeout(() => {
          question.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
      });
    });
  }
  
  // ===== SMOOTH SCROLL =====
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  // ===== ANIMAÇÕES =====
  function initAnimations() {
    // Animação de entrada para elementos
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
  
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);
  
    // Aplicar observer aos elementos
    const animatedElements = document.querySelectorAll('.servico-card, .funcionario-card, .pet-slide, .depoimento-card, .blog-card');
    animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(element);
    });
  
    // Animação do header ao rolar
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      
      lastScroll = currentScroll;
    });
  
    // Adicionar transição ao header
    header.style.transition = 'transform 0.3s ease';
  }
  
  // ===== SISTEMA DE NOTIFICAÇÕES =====
  function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
  
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        ${message}
      </div>
    `;
  
    // Estilos da notificação
    const notificationStyles = `
      <style>
        .notification {
          position: fixed;
          top: 100px;
          right: 20px;
          max-width: 400px;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          z-index: 10000;
          animation: slideInRight 0.3s ease;
          font-weight: 500;
        }
  
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
  
        .notification-success {
          background: linear-gradient(135deg, #4ecdc4, #45b7d1);
          color: white;
        }
  
        .notification-error {
          background: linear-gradient(135deg, #ff6b6b, #ff5252);
          color: white;
        }
  
        .notification-info {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }
      </style>
    `;
  
    // Adicionar notificação ao DOM
    if (!document.querySelector('.notification-styles')) {
      const styleElement = document.createElement('div');
      styleElement.className = 'notification-styles';
      styleElement.innerHTML = notificationStyles;
      document.head.appendChild(styleElement);
    }
  
    document.body.appendChild(notification);
  
    // Remover notificação após 5 segundos
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }
  
  // ===== NEWSLETTER =====
  function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = this.querySelector('input[type="email"]').value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!emailRegex.test(email)) {
        showNotification('❌ Email inválido!', 'error');
        return;
      }
      
      // Salvar email
      let subscribers = JSON.parse(localStorage.getItem('newsletter') || '[]');
      subscribers.push({ email, data: new Date().toISOString() });
      localStorage.setItem('newsletter', JSON.stringify(subscribers));
      
      showNotification('✅ Cadastrado com sucesso! Bem-vindo à PetLove!', 'success');
      this.reset();
    });
  }
  
  // ===== EFEITOS EXTRAS =====
  // Adicionar partículas de patas ao mover o mouse (opcional - divertido!)
  document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.98) { // 2% de chance de criar uma pata
      const paw = document.createElement('div');
      paw.innerHTML = '🐾';
      paw.style.position = 'fixed';
      paw.style.left = e.clientX + 'px';
      paw.style.top = e.clientY + 'px';
      paw.style.pointerEvents = 'none';
      paw.style.fontSize = '20px';
      paw.style.opacity = '0.5';
      paw.style.animation = 'fadeOut 2s ease';
      paw.style.zIndex = '9999';
      
      document.body.appendChild(paw);
      
      setTimeout(() => paw.remove(), 2000);
    }
  });
  
  // CSS para o efeito de fade out das patas
  const pawStyles = `
    <style>
      @keyframes fadeOut {
        from {
          opacity: 0.5;
          transform: translateY(0) rotate(0deg);
        }
        to {
          opacity: 0;
          transform: translateY(-50px) rotate(360deg);
        }
      }
  
      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    </style>
  `;
  
  document.head.insertAdjacentHTML('beforeend', pawStyles);
  
  // ===== CONSOLE EASTER EGG =====
  console.log('%c🐾 PetLove Premium - Feito com amor para nossos amigos de quatro patas! 🐾', 
    'background: linear-gradient(135deg, #ff6b6b, #4ecdc4); color: white; padding: 10px 20px; font-size: 16px; border-radius: 10px;');
  
  console.log('%c💡 Dica: Use Ctrl+Shift+I para ver o código-fonte e aprender mais!', 
    'background: #333; color: #4ecdc4; padding: 5px 10px; font-size: 12px; border-radius: 5px;');