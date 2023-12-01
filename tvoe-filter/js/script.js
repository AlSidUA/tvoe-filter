//=================================================================================
							/*СОРТУВАННЯ*/
//=================================================================================
	//СОРТУВАННЯ ЗА ЦІНОЮ ТА РЕЙТИНГОМ//
	let sortingBlock = document.getElementById('sortingBlock');

	sortingBlock.addEventListener("change", function() {
		eventMouse();
		let selectedOption = sortingBlock.value;
		if (selectedOption === 'Популярні') {
			for (let i = 0; i < show.children.length; i++) {
				for (let j = i; j < show.children.length; j++){
					if (+show.children[i].getAttribute('data-rating') < +show.children[j].getAttribute('data-rating')){
						replaceNode = show.replaceChild(show.children[j], show.children[i]);
						insertAfter(replaceNode, show.children[i]);
					}
				}
			}
		} else if (selectedOption === 'Дешеві') {
			for (let i = 0; i < show.children.length; i++) {
				for (let j = i; j < show.children.length; j++){
					if (+show.children[i].getAttribute('data-price') > +show.children[j].getAttribute('data-price')){
						replaceNode = show.replaceChild(show.children[j], show.children[i]);
						insertAfter(replaceNode, show.children[i]);
					}
				}
			}
		} else if (selectedOption === 'Дорогі') {
			for (let i = 0; i < show.children.length; i++) {
				for (let j = i; j < show.children.length; j++){
					if (+show.children[i].getAttribute('data-price') < +show.children[j].getAttribute('data-price')){
						replaceNode = show.replaceChild(show.children[j], show.children[i]);
						insertAfter(replaceNode, show.children[i]);
					}
				}
			}
		}
	});

	function insertAfter(elem, refElem) {
		return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
	}

	//==============================================================================

				//ПРИХОВУВАННЯ ТА ПОКАЗ ФІЛЬТРІВ
	document.addEventListener('click', function(event) {
		if(event.target.classList.contains('filters__type-title')){
			event.target.classList.toggle('active');
			event.target.nextElementSibling.classList.toggle('filters__type-bottom--hidden');
		}
	});

	// ПРИХОВУВАННЯ ТА ПОКАЗ ДОДАТКОВОЇ ІНФОРМАЦІЇ
function eventMouse() {
    const cardsContainer = document.getElementById('show');

    cardsContainer.addEventListener('mouseover', function (event) {
        const targetCard = event.target.closest('.card');

        if (targetCard) {
            targetCard.classList.add('card--active');
            const cardInfoProduct = targetCard.querySelector('.card__info');
            if (cardInfoProduct) {
                cardInfoProduct.classList.add('info__product--active');
            }
        }
    });

    cardsContainer.addEventListener('mouseout', function (event) {
        const targetCard = event.target.closest('.card');

        if (targetCard) {
            targetCard.classList.remove('card--active');
            const cardInfoProduct = targetCard.querySelector('.card__info');
            if (cardInfoProduct) {
                cardInfoProduct.classList.remove('info__product--active');
            }
        }
    });
}
// ПРИХОВУВАННЯ ТА ПОКАЗ ТЕКСТУ-ОПИСУ ТОВАРІВ 
showText()
function showText() {
	const showTextBtn = document.querySelector('.show__data-btn');
	let showTextData = document.querySelector('.show__data-text');

	showTextBtn.addEventListener('click', function(event) {
		if(showTextData.classList.contains('show__data-text')){
			showTextData.classList.toggle('show__data-text--active');
			showTextBtn.textContent = "Читати повністю";
			if(showTextData.classList.contains('show__data-text--active')){
				showTextBtn.textContent = "Приховати";
			}
            console.log(showTextBtn.textContent);
		} else{
            showTextData.classList.toggle('show__data-text--active');
			
            console.log(showTextBtn.textContent);
		}
	});
}

	//==============================================================================
								/*ФІЛЬТР ЗА ЦІНОЮ*/
	function priceSelection() {
	//==============================================================================
							//КНОПКА ВИБОРУ ЦІНИ//
	const showPriceBtn = document.getElementById("price__btn");
	showPriceBtn.addEventListener("click", function() {
		let minPrice = parseInt(document.getElementById("price__min").value);
		let maxPrice = parseInt(document.getElementById("price__max").value);
		filterAndDisplayProducts(minPrice, maxPrice);
	});

	function filterAndDisplayProducts(minPrice, maxPrice) {
		let filteredProducts = waterHeaters.filter(product => {
			return product.price >= minPrice && product.price <= maxPrice;
		});
		displayProducts(filteredProducts);
	}

	function displayProducts(products) {
		const filteredCardsHTML = generateCards(products);
		show.innerHTML = filteredCardsHTML.join("");
	}
	
// ==================================================================================
							//RANGE//
	window.onload = function(){
		slideMin();
		slideMax();
	};
	const minVal = document.getElementById("range__min");
	const maxVal = document.getElementById("range__max");
	const minSum = document.getElementById("price__min");
	const maxSum = document.getElementById("price__max");
	const minGap = 0;
	const range = document.getElementById("range__progress");
	const sliderMinValue = parseInt(minVal.min);
	const sliderMaxValue = parseInt(minVal.max);

	minVal.addEventListener("input", slideMin);
	maxVal.addEventListener("input", slideMax);
	minSum.addEventListener("input", setMinInput);
	maxSum.addEventListener("input", setMaxInput);

	
	function slideMin() {
		let gap = parseInt(maxVal.value) - parseInt(minVal.value);
		if (gap <= minGap){
			minVal.value = parseInt(maxVal.value) - minGap;
		}
		minSum.value = minVal.value;
		setArea();
	}
	function slideMax() {
		let gap = parseInt(maxVal.value) - parseInt(minVal.value);
		if (gap <= minGap){
			maxVal.value = parseInt(minVal.value) + minGap;
		}
		maxSum.value = maxVal.value;
		setArea();
	}
	function setArea() {
		range.style.left = (minVal.value / sliderMaxValue) * 100 + "%";
		range.style.right = 100 - (maxVal.value / sliderMaxValue) * 100 + "%";
	}
	function setMinInput () {
		let minPrice = parseInt(minSum.value);
		if (minPrice < sliderMinValue){ 
			minSum.value = sliderMinValue;
		}
		minVal.value = minSum.value;
		slideMin();
	}
	function setMaxInput () {
		let maxPrice = parseInt(maxSum.value);
		if (maxPrice > sliderMaxValue){ 
			maxSum.value = sliderMaxValue;
		}
		maxVal.value = maxSum.value;
		slideMax();
	}
}
//==================================================================================
							/*ФІЛЬТРАЦІЯ ТОВАРІВ*/
{
	const filtersContainer = document.getElementById('filters');
	const selectedCategories = ["manufacturer", "pipe_diameter", "power", "heater_type"];
	let filtersShowHTML = ''; // змінна для збереження значення filtersShowHTML
	//============================================================================
							//ГЕНЕРАЦІЯ ФІЛЬТРІВ
function generateFilters(data) {
    const filters = {};
    data.forEach(product => {
        Object.keys(product).forEach(key => {
            if (selectedCategories.includes(key)) {
                const filterName =
                    key === "manufacturer" ? "Виробник" :
                    key === "power" ? "Потужність" :
                    key === "pipe_diameter" ? "Діаметр труби" :
                    key === "heater_type" ? "Тип Тена" :
                    key;
                filters[filterName] = filters[filterName] || {};
                filters[filterName][product[key]] = true;
            }
        });
    });

    const filtersHTML = Object.keys(filters).map(key => {
        const options = Object.keys(filters[key]).map((value, index) => {
			// клас "hidden" для чекбоксів, якщо їх більше 5
            const hiddenClass = index >= 5 ? 'hidden' : '';
            const numericClass = !isNaN(value) ? 'numeric' : '';
            return `
                <li class="filters__value-data value__data ${hiddenClass} ${numericClass}">
                    <label>
                        <input type="checkbox" class="value__data-checkbox" data-filter="${value}">
                        <span class="custom__checkbox"></span>
                    </label>
                    <h4 class="value__data-title">${value}</h4>
                    <span className="value__data-count">3</span>
                </li>
            `;
        }).join('');

        // клас "hidden", якщо чекбоксів менше 5
        const buttonsClass = options.length <= 5 ? 'hidden' : '';

        return `
            <div class="filters__type">
                <div class="filters__type-title">${key}</div>
                <div class="filters__type-bottom filters__value">
                    <div class="filter-group">
                        <ul class="filters__value">
                            ${options}
                        </ul>
                        <button class="filters_value_btn showMoreButton ${buttonsClass}">Показати ще</button>
						<button class="filters_value_btn hideButton hidden ${buttonsClass}">Приховати</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    return filtersHTML;
}
const filtersArr = generateFilters(waterHeaters);
filtersContainer.innerHTML = filtersArr;


// оновлення видимості кнопок "Показати ще" і "Приховати"
function updateButtonsVisibility(filterGroup) {
    const checkboxes = filterGroup.querySelectorAll('.value__data');
    const showMoreButton = filterGroup.querySelector('.showMoreButton');
    const hideButton = filterGroup.querySelector('.hideButton');

    // якщо кількість чекбоксів менше або рівна 5, ховаємо усі кнопки
    if (checkboxes.length <= 5) {
        hideButton.classList.add('hidden');
        showMoreButton.classList.add('hidden');
    } else {
        // якщо кількість чекбоксів більше 5, ховаємо кнопку "Приховати" і показуємо "Показати ще"
        hideButton.classList.add('hidden');
        showMoreButton.classList.remove('hidden');
    }
}

document.querySelectorAll('.filter-group').forEach(filterGroup => {
    // завантаженні сторінки
    updateButtonsVisibility(filterGroup);

    // події для кнопок
    filterGroup.querySelectorAll('.showMoreButton, .hideButton').forEach(button => {
        button.addEventListener('click', function () {
            const filterGroup = button.closest('.filter-group');
            const checkboxes = filterGroup.querySelectorAll('.value__data.hidden');
            const visibleCheckboxes = filterGroup.querySelectorAll('.value__data:not(.hidden)');
            const showMoreButton = filterGroup.querySelector('.showMoreButton');
            const hideButton = filterGroup.querySelector('.hideButton');

            // видимість чекбоксів
            checkboxes.forEach((checkbox, index) => {
                checkbox.classList.toggle('hidden', index >= 7);
            });

            // видимість кнопок
            if (button.classList.contains('showMoreButton')) {
                hideButton.style.display = 'inline-block';
                showMoreButton.style.display = 'none';

                // відновлення відображення при кліку на "Показати ще"
                const hiddenCheckBoxes = filterGroup.querySelectorAll('.value__data.hidden');
                hiddenCheckBoxes.forEach(item => {
                    item.style.display = ''; 
                });
            } else {
                hideButton.style.display = 'none';
                showMoreButton.style.display = 'inline-block';

				//встановлення класу "hidden" чекбоксам при кліку на "Приховати"
				const checkboxesToHide = Array.from(filterGroup.querySelectorAll('.value__data:not(.hidden)')).slice(5);
				checkboxesToHide.forEach(item => {
					item.classList.add('hidden');
				});
            }

            // перевірка та оновлення видимості кнопок
            updateButtonsVisibility(filterGroup);
            // перевірка кількості чекбоксів, що виводяться 
            console.log("Checkboxes Count:", visibleCheckboxes.length);
        });
    });
});

	function updateFilterValue(newFilterValue) {
		console.log('значення фільтра:', newFilterValue);
	}
	
	//-------------------------------//
	//слухач подій до чекбоксів:
	const checkFilters = document.querySelector('.filters');
	let selectedFilterText = [];
	checkFilters.addEventListener('change', function(event) {
		if (event.target.checked) {
			const selectedValue = event.target.dataset.filter;
			updateFilterValue(selectedValue);
			const category = event.target.closest('.filters__type').querySelector('.filters__type-title').textContent;//отримуєм назву категорії
			let filterText = `${category}: ${selectedValue}`; 
			selectedFilterText.push(filterText); 
	// updateFilterValue з новим значенням фільтра
			updateFilterValue(selectedValue);
		} else {
			//  видаляємо запис з масиву selectedFilterTextякщо, якщо чекбокс був знятий
			const selectedValue = event.target.dataset.filter;
			updateFilterValue(selectedValue);
			const category = event.target.closest('.filters__type').querySelector('.filters__type-title').textContent;
			let filterText = `${category}: ${selectedValue}`;
			const index = selectedFilterText.indexOf(filterText);
			if (index !== -1) {
				selectedFilterText.splice(index, 1);
			}
			// updateFilterValue з новим значенням фільтра
			updateFilterValue(selectedValue);
		}
		// відображення обраних фільтрів
		displayActiveFilters();
	});

	//-------------------------------//
	//функція відображення активних фільтрів:
	function displayActiveFilters() {
		const resultActively = document.querySelector('.result__actively'); 
		filtersShowHTML = selectedFilterText.map(filterText => {
			return `<div class="actively__box"><span class="actively__box-data">${filterText}</span> <button class="actively__box-remove box-remove">
			<img src="/tvoe-filter/img/icons/cross.svg" alt="">
			</button></div>`;
		}).join('');

		resultActively.innerHTML = filtersShowHTML; // відображення блоку з обраними фільтрами result__actively
		//-------------------------------//
			//видалення активного чекбоксу
		document.querySelectorAll('.actively__box-remove').forEach(function(remove){
			remove.addEventListener('click', function(event) {
				const filterText = event.currentTarget.parentElement.textContent.trim();
				const index = selectedFilterText.indexOf(filterText);
				if (index !== -1) {
					selectedFilterText.splice(index, 1);
					displayActiveFilters();
					// чекбокс зі значенням data-filter - знімання  відмітки (checked)
					const filterValue = filterText.split(': ')[1];
					const checkbox = document.querySelector(`.value__data-checkbox[data-filter="${filterValue}"]`);
					if (checkbox && checkbox.checked) {
						checkbox.checked = false;
					}
				}
			});
		});
	}

		const closeActiveFilters = document.querySelector(".btn__result");
		const resultActively = document.querySelector('.result__actively');
		
		closeActiveFilters.addEventListener("click", function() {
			// поточний стан displayActiveFilters
			displayActiveFilters();
			// очищення вмісту resultActively
			resultActively.innerHTML = '';

			// чекбокси, які мають відмітку
			const checkedCheckboxes = document.querySelectorAll('.value__data-checkbox:checked');

			// зняття відміток з усіх чекбоксів
			checkedCheckboxes.forEach(function(checkbox) {
				checkbox.checked = false;
			});

			// очищення масиву фільтрів
			selectedFilterText = [];

			//оновлений стан displayActiveFilters
			displayActiveFilters();
		});
}
	//==============================================================================
							//ГЕНЕРАЦІЯ КАРТОК
	{
		let cardsArr = [];
		
	function generateCards(data, sortBy) {
		let cards = [];
		for (let i = 0; i < data.length; i++) {
			//**************************************************
			//УМОВИ ДЛЯ ВІДОБРАЖЕННЯ КАРТОК
			let countClass = "card__count";
			let countMessage = data[i].stock_quantity;
			let priceCommonClass = "card__price-common price__common";
			let priceDiscountClass = "card__price-discount price__discount";
			let cardTopPromotion = "card__top-promotion top__promotion";
			
			if (data[i].promotion === false && data[i].stock_quantity === 0 ) {
				cardTopPromotion = "top__promotion_empty";
				countClass = "card__count card__count_empty";
				countMessage = "Товар відсутній";
				priceDiscountClass = "price__discount-empty";
				priceCommonClass = "price__common-empty";
			}else if(data[i].stock_quantity === 0 ) {
				countClass = "card__count card__count_empty";
				countMessage = "Товар відсутній";
				priceDiscountClass = "price__discount-empty";
				priceCommonClass = "price__common-empty";
			} else if (data[i].promotion === false) {
				countClass = "card__count card__count_empty";
				countMessage = "";
				cardTopPromotion = "top__promotion_empty";
				priceDiscountClass = "price__discount-empty";
				priceCommonClass = "price__common_decor";
			} else {
				countClass = "price__class-empty"; 
				countMessage = "";
			} 
			if (sortBy === 'Популярні') {
				data.sort((a, b) => b.reviews.count - a.reviews.count); // сортування за відгуками
			} else if (sortBy === 'Дешеві') {
				data.sort((a, b) => a.price - b.price);
			} else if (sortBy === 'Дорогі') {
				data.sort((a, b) => b.price - a.price);
			}
			//**************************************************
			cards.push(` 
				<div class="card" data-price="${data[i].price}" data-rating="${data[i].reviews.count}">
					<div class="card__container">
						<div class="card__top">
							<div id="promotion" class="${cardTopPromotion}">Акція</div>
							<div class="card__top-icons">
								<img id="payInInstallments" src="/tvoe-filter/img/icons/pay-part_new.svg" alt="Part">
								<img src="/tvoe-filter/img/icons/Vector.svg" alt="Vector">
							</div>
						</div>
						<div class="card__img"><img src="${data[i].photo}" alt="Photo" /> </div>
						<div class="card__title">
							<h2 class="card__title-text">${data[i].name}</h2>
						</div>
						<div class="card__rating rating">
							<div class="rating__container">
								<ul class="rating__icons">
									<li class="rating__icons-1"><img src="/tvoe-filter/img/icons/star.svg" alt="Star"></li>
									<li class="rating__icons-2"><img src="/tvoe-filter/img/icons/star.svg" alt="Star"></li>
									<li class="rating__icons-3"><img src="/tvoe-filter/img/icons/star.svg" alt="Star"></li>
									<li class="rating__icons-4"><img src="/tvoe-filter/img/icons/star.svg" alt="Star"></li>
									<li class="rating__icons-5"><img src="/tvoe-filter/img/icons/star.svg" alt="Star"></li>
								</ul>
							</div>
							<div class="rating__reviews">
								<div class="rating__reviews-sum">${data[i].reviews.count}</div>
							</div>
						</div>
						<div class="card__buy">
							<div class="card__buy-price card__price">
								<div id="price-common" class="${priceCommonClass}">${data[i].price}</div>
								<div id="price-discount" class="${priceDiscountClass}">${data[i].promotional_price}</div>
								<div class="${countClass}">
								<div> ${countMessage}</div>
							</div>
						</div>
							<button class="card__buy-btn"><img src="/tvoe-filter/img/icons/buy.svg" alt=""></button>
						</div>
						<div class="card__info info__product">
							<div class="info__product-producer producer__info">
								<div class="producer__info-producer">Виробник</div>
								<div class="producer__info-data">${data[i].manufacturer}</div>
							</div>
							<div class="info__product-power power__info">
								<div class="power__info-power">Потужність кВт.</div>
								<div class="power__info-data">${data[i].power}</div>
							</div>
							<div class="info__product-leght leght__info">
								<div class="leght__info-length">Діаметр вх. / вих. труби
								</div>
								<div class="leght__info-data">${data[i].pipe_diameter}</div>
							</div>
							<div class="info__product-step step__info">
								<div class="step__info-step">Тип Тена</div>
								<div class="step__info-data">${data[i].heater_type}</div>
							</div>
						</div>
					</div>
				</div>
			`);
	}
			return cards;
}

function main() {
    let currentPage = 1; 
    let rows = 10; 
    let pagesCount;
	let currentSortOption = 'Популярні'; 
    function displayList(arrData, rowPerPage, page) {
        const cardsContainer = document.querySelector("#show");
		if (!cardsContainer) {
			console.error("Error: #show container not found.");
			return;
		}
		cardsContainer.innerHTML = "";
        page--;
        
		const start = rowPerPage * page;
        const end = start + rowPerPage;
		const paginatedData = arrData.slice(start, end);

		paginatedData.forEach(element => {
		const fragment = document.createDocumentFragment();
		for (let i = 0; i < paginatedData.length; i++) {
			const cardHTML = paginatedData[i];
			const cardElement = document.createElement('div');
			cardElement.innerHTML = cardHTML;
			fragment.appendChild(cardElement);
		}
		// очищення контейнер перед додаванням нових товарів та додавання
		cardsContainer.innerHTML = '';
		cardsContainer.appendChild(fragment);
	});
}

    function createPaginationButton(page) {
        const liEl = document.createElement("li");
        liEl.classList.add('pagination__item');
        liEl.innerText = page;

        liEl.addEventListener('click', () => {
            currentPage = page;
            updatePage();
        });

        return liEl;
    }

    function displayPagination(arrData, rowPerPage, currentPage) {
        const paginationEl = document.querySelector('.pagination');

        pagesCount = Math.ceil(arrData.length / rowPerPage);

        const ulEl = document.createElement("ul");
        ulEl.classList.add('pagination__list');

        for (let i = 0; i < pagesCount; i++) {
            const liEl = createPaginationButton(i + 1, currentPage);
            ulEl.appendChild(liEl);
        }

        const firstPaginationItem = ulEl.querySelector('li');
        if (firstPaginationItem) {
            firstPaginationItem.classList.add('pagination__item--active');
        }

        paginationEl.innerHTML = "";
        paginationEl.appendChild(ulEl);
    }
	

	cardsArr = generateCards(waterHeaters, currentSortOption); // поточний тип сортування

	sortingBlock.addEventListener('change', function () {
        currentSortOption = sortingBlock.value;
        cardsArr = generateCards(waterHeaters, currentSortOption);
        currentPage = 1;
        displayList(cardsArr, rows, currentPage);
        displayPagination(cardsArr, rows, currentPage);
    });

    function updatePage() {
        displayList(cardsArr, rows, currentPage);
    
        const currentItemLi = document.querySelector("li.pagination__item--active");
    
        if (currentItemLi) {
            currentItemLi.classList.remove("pagination__item--active");
        }
    
        const paginationItems = document.querySelectorAll('.pagination__item');
    
        if (paginationItems[currentPage - 1]) {
            paginationItems[currentPage - 1].classList.add('pagination__item--active');
        }
    }

    displayList(cardsArr, rows, currentPage);
    displayPagination(cardsArr, rows, currentPage);

    const showMoreBtn = document.querySelector('.pagination__show-btn');
    showMoreBtn.addEventListener('click', () => {
        rows += 10;
        currentPage = 1;
        displayList(cardsArr, rows, currentPage);
        displayPagination(cardsArr, rows, currentPage);
    });

    const arrowNext = document.querySelector('.pagination__arrow-right');
    arrowNext.addEventListener('click', () => {
        if (currentPage < Math.ceil(cardsArr.length / rows)) {
            currentPage++;
            updatePage();
        }
    });

    const arrowPrev = document.querySelector('.pagination__arrow-left');
    arrowPrev.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePage();
        }
    });
}


	document.addEventListener('DOMContentLoaded', function () {
		if (sortingBlock) {
			sortingBlock.value = 'Популярні';
		}
		
		main();
		priceSelection();
		eventMouse();

	});
}