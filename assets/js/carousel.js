document.addEventListener("DOMContentLoaded", function () {
    // Dados do projeto em formato JSON
    const projectsData = [
      {
        id: "project1",
        title: "Gestão de Projetos",
        description:
          "Sistema completo de gestão de projetos com acompanhamento de tarefas, prazos e recursos. Permite gerenciar múltiplos projetos simultaneamente, com dashboards personalizados e relatórios detalhados para cada equipe.",
        mainImage: "assets/imgs/folio-1.png",
        technologies: ["JavaScript", "React", "CSS"],
        gallery: [
          "assets/imgs/projectos/project1/1.png",
          "assets/imgs/projectos/project1/2.png",
          "assets/imgs/projectos/project1/3.png",
          "assets/imgs/projectos/project1/4.png",
        ],
      },
      {
        id: "project2",
        title: "Gestão de Armazéns",
        description:
          "Sistema abrangente para controle de estoque e logística de armazéns. Inclui funcionalidades para rastreamento de produtos, gestão de inventário e otimização de espaço de armazenamento.",
        mainImage: "assets/imgs/folio-2.png",
        technologies: ["Laravel", "PHP", "JavaScript", "CSS", "MySQL"],
        gallery: [
        "assets/imgs/projectos/project2/1.png",
        "assets/imgs/projectos/project2/2.png",
        "assets/imgs/projectos/project2/3.png",
        "assets/imgs/projectos/project2/4.png",
        "assets/imgs/projectos/project2/5.png",
        ],
      },
      {
        id: "project3",
        title: "Portal de Gestão de Salas de Exame",
        description:
          "Solução para instituições educacionais gerenciarem a alocação de salas para exames e provas. Permite agendamento, controle de capacidade e monitoramento de ocupação em tempo real.",
        mainImage: "assets/imgs/folio-3.png",
        technologies: ["Laravel", "PHP", "JavaScript", "CSS", "MySQL"],
        gallery: [
        "assets/imgs/projectos/project3/1.png",
        "assets/imgs/projectos/project3/2.png",
        "assets/imgs/projectos/project3/3.png",
        "assets/imgs/projectos/project3/4.png",

            ],
      },
    ];

    // Elementos DOM
    const carousel = document.getElementById("projectCarousel");
    const indicators = document.getElementById("carouselIndicators");
    const thumbnails = document.getElementById("carouselThumbnails");
    const prevBtn = document.querySelector(".carousel-btn-prev");
    const nextBtn = document.querySelector(".carousel-btn-next");
    const viewDetailsBtn = document.getElementById("viewDetailsBtn");
    const projectDetails = document.getElementById("projectDetails");
    const projectGallery = document.getElementById("projectGallery");
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const closeModal = document.querySelector(".close-modal");

    // Detalhes do projeto
    const detailTitle = document.getElementById("detailTitle");
    const detailDescription = document.getElementById("detailDescription");
    const detailTechs = document.getElementById("detailTechs");

    let currentIndex = 0;
    const slideWidth = 100; // em porcentagem
    let detailsVisible = false;

    // Função para gerar o HTML do carrossel a partir do JSON
    function generateCarousel() {
      let slidesHTML = "";
      let indicatorsHTML = "";
      let thumbnailsHTML = "";

      projectsData.forEach((project, index) => {
        // Criar slides
        slidesHTML += `
            <div class="carousel-slide" data-project-id="${project.id}">
              <img src="${project.mainImage}" alt="${project.title}">
              <div  class="carousel-caption">
                <h4 >${project.title}</h4>
              </div>
            </div>
          `;

        // Criar indicadores
        indicatorsHTML += `
            <span class="carousel-indicator ${
              index === 0 ? "active" : ""
            }" data-index="${index}"></span>
          `;

        // Criar miniaturas
        thumbnailsHTML += `
            <img src="${project.mainImage}" class="carousel-thumbnail ${
          index === 0 ? "active" : ""
        }" data-index="${index}" alt="Miniatura ${index + 1}">
          `;
      });

      // Inserir no DOM
      carousel.innerHTML = slidesHTML;
      indicators.innerHTML = indicatorsHTML;
      thumbnails.innerHTML = thumbnailsHTML;

      // Adicionar event listeners após criar os elementos
      setupEventListeners();
    }

    // Função para ir para um slide específico
    function goToSlide(index) {
      if (index < 0) {
        index = projectsData.length - 1;
      } else if (index >= projectsData.length) {
        index = 0;
      }

      currentIndex = index;
      carousel.style.transform = `translateX(-${
        currentIndex * slideWidth
      }%)`;

      // Atualizar indicadores
      document
        .querySelectorAll(".carousel-indicator")
        .forEach((indicator, i) => {
          indicator.classList.toggle("active", i === currentIndex);
        });

      // Atualizar miniaturas
      document
        .querySelectorAll(".carousel-thumbnail")
        .forEach((thumbnail, i) => {
          thumbnail.classList.toggle("active", i === currentIndex);
        });

      // Esconder detalhes do projeto quando mudar de slide
      if (detailsVisible) {
        hideProjectDetails();
      }
    }

    // Função para mostrar detalhes do projeto atual
    function showProjectDetails() {
      const currentProject = projectsData[currentIndex];

      detailTitle.textContent = currentProject.title;
      detailDescription.textContent = currentProject.description;

      // Mostrar tecnologias
      let techsHTML = "";
      currentProject.technologies.forEach((tech) => {
        techsHTML += `<span class="tech-tag">${tech}</span>`;
      });
      detailTechs.innerHTML = techsHTML;

      // Mostrar galeria de imagens
      let galleryHTML = "";
      currentProject.gallery.forEach((imgSrc, i) => {
        galleryHTML += `
            <img src="${imgSrc}" class="gallery-image" style="--index:${
          i + 1
        }" alt="${currentProject.title} - Imagem ${
          i + 1
        }" data-src="${imgSrc}">
          `;
      });
      projectGallery.innerHTML = galleryHTML;

      // Adicionar event listeners para as imagens da galeria
      document.querySelectorAll(".gallery-image").forEach((img) => {
        img.addEventListener("click", function () {
          modalImage.src = this.getAttribute("data-src");
          modal.style.display = "flex";
          // Pequeno atraso para permitir que o display mude antes da animação
          setTimeout(() => {
            modal.classList.add("show");
          }, 10);
        });
      });

      // Mostrar detalhes com animação
      projectDetails.classList.add("show");
      detailsVisible = true;

      // Mudar texto do botão
      viewDetailsBtn.textContent = "Ocultar detalhes";

      // Rolar suavemente para os detalhes
      setTimeout(() => {
        projectDetails.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    }

    // Função para esconder os detalhes
    function hideProjectDetails() {
      projectDetails.classList.remove("show");
      detailsVisible = false;
      viewDetailsBtn.textContent = "Ver detalhes do projeto";
    }

    // Configurar event listeners
    function setupEventListeners() {
      // Event listeners para os botões
      prevBtn.addEventListener("click", () => {
        goToSlide(currentIndex - 1);
      });

      nextBtn.addEventListener("click", () => {
        goToSlide(currentIndex + 1);
      });

      // Event listeners para os indicadores
      document
        .querySelectorAll(".carousel-indicator")
        .forEach((indicator) => {
          indicator.addEventListener("click", () => {
            const index = parseInt(indicator.dataset.index);
            goToSlide(index);
          });
        });

      // Event listeners para as miniaturas
      document
        .querySelectorAll(".carousel-thumbnail")
        .forEach((thumbnail) => {
          thumbnail.addEventListener("click", () => {
            const index = parseInt(thumbnail.dataset.index);
            goToSlide(index);
          });
        });

      // Event listener para o botão "Ver detalhes"
      viewDetailsBtn.addEventListener("click", () => {
        if (detailsVisible) {
          hideProjectDetails();
        } else {
          showProjectDetails();
        }
      });

      // Event listener para fechar o modal
      closeModal.addEventListener("click", () => {
        modal.classList.remove("show");
        setTimeout(() => {
          modal.style.display = "none";
        }, 300);
      });

      // Fechar o modal clicando fora da imagem
      window.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("show");
          setTimeout(() => {
            modal.style.display = "none";
          }, 300);
        }
      });

      // Tecla Escape fecha o modal
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.style.display === "flex") {
          modal.classList.remove("show");
          setTimeout(() => {
            modal.style.display = "none";
          }, 300);
        }
      });
    }

    // Autoplay (opcional)
    let autoplayInterval;

    function startAutoplay() {
      autoplayInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 5000); // Trocar slide a cada 5 segundos
    }

    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }

    // Gerar o carrossel a partir do JSON
    generateCarousel();

    // Iniciar autoplay
    startAutoplay();

    // Parar autoplay ao interagir com o carrossel
    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("touchstart", stopAutoplay);

    // Reiniciar autoplay quando não estiver interagindo
    carousel.addEventListener("mouseleave", startAutoplay);
    carousel.addEventListener("touchend", startAutoplay);
  });