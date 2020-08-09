'use strict'
let date;
function createCalendar(elem, year, month) {
	date = new Date(year, month, 0);
	let lastDay = date.getDate();
	let dayOfWeek = date.getDay(date.setDate(1));
	if (dayOfWeek == 0) dayOfWeek = 7;
	
	createTable(elem, lastDay, dayOfWeek);
		
}

function createTable(elem, lastDay, dayOfWeek ) {
	const arrDaysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
	let table = document.createElement('table');
	table.id = 'calendar';
	let caption = document.createElement('caption');
	let tbody = document.createElement('tbody');
	elem.append(table);
	table.append(caption);
	caption.append(document.createElement('tr').innerHTML = formatDate(date));
	table.append(tbody);
	// tbody.append(thead);
//Формируем заголовок
	tbody.append(document.createElement('tr'));
	arrDaysOfWeek.forEach((item, index) => {
		let td = document.createElement('th');
		td.innerText = item;
		td.style.background = 'lightblue';
		if (index > 4) td.style.color = 'red';
		tbody.firstChild.append(td);
	});
//формируем тело таблицы
let d;
date = new Date();
let rows = Math.ceil((lastDay + dayOfWeek - 1)/7);
	for (let i = 1; i <= rows; i++){
		tbody.append(document.createElement('tr'));
		for (let j = 1; j <= 7; j++) {
			let td = document.createElement('td');
			if (j > 5) td.style.color = 'red';
			td.innerText = 0 < (d = i*7 - 6 + j - dayOfWeek) && d <= lastDay ? d : '';
			if (+td.innerText == date.getDate()) td.setAttribute('now', '');
			tbody.lastChild.append(td);
		}
	}
}
function formatDate(date) {
	const arrMonth = [
		"Январь",
		"Февраль",
		"Март",
		"Апрель",
		"Май",
		"Июнь",
		"Июль",
		"Август",
		"Сентябрь",
		"Октябрь",
		"Ноябрь",
		"Декабрь",
	];
	let strDate = arrMonth[date.getMonth()] + ' ' + date.getFullYear(date) + ' года.';
	return strDate;
}

let elem = document.createElement('div');
document.body.append(elem);
let d = new Date();
createCalendar(elem, d.getFullYear(), d.getMonth() + 1);

let calendar = document.getElementById('calendar');
calendar.addEventListener('mouseover', handler);
calendar.addEventListener('mouseout', handler);

function handler(event) {
	if (event.target.tagName != 'TD') return;
	//нужно запомнить цвет сегодняшней ячейки
	// let color;
	
	if (event.type == 'mouseover') {
		// color = event.target.style.background;
		event.target.style.background = '#48D1CC';
		return;
	}
	if (event.type == 'mouseout') {
		event.target.style.background = '';
		return;
	}
}