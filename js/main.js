'use strict'

var Y_MIN = 130;
var Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkinTimes = ['12:00', '13:00', '14:00'];
var checkoutTimes = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapPin = document.querySelector('#pin').content.querySelector('.map__pin');
map.classList.remove('.map--faded');


var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

var createData = function () {
  var data = [];

  for (var i = 1; i <= 8; i++) {
    var obj = {};
    var author = {};
    var offer = {};
    var location = {};

    author.avatar = 'img/avatars/user0' + i + '.png';
    offer.title = 'заголовок предложения ' + i;
    offer.address = location.x + ' , ' + location.y;
    offer.price = Math.ceil(Math.random() * i + 100);
    offer.type = types[i % types.length];
    offer.rooms = Math.ceil(Math.random() * i * 2);
    offer.quests = Math.ceil(Math.random() * i * 4);
    offer.checkin = checkinTimes[i % checkinTimes.length];
    offer.checkout = checkoutTimes[i % checkoutTimes.length];
    offer.features = features.slice(0, Math.ceil(Math.random() * features.length));
    offer.description = 'строка с описанием' + i;
    offer.photos = photos.slice(0, Math.ceil(Math.random() * photos.length));
    location.x = getRandomInteger(0, map.offsetWidth);
    location.y = getRandomInteger(Y_MIN, Y_MAX);
    obj.author = author;
    obj.offer = offer;
    obj.location = location;
    data.push(obj);
  }
  return data;
};
var pinsData = createData();


var createPinElement = function (pin) {
  var newPin = mapPin.cloneNode(true);
  var img = newPin.querySelector('img');
  newPin.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
  newPin.style.top = pin.location.y - PIN_HEIGHT + 'px';
  img.src = pin.author.avatar;
  img.alt = pin.offer.title;
  return newPin;
};

var insertPins = function (pins) {
  var pinsList = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    pinsList.appendChild(createPinElement(pins[i]));
  }

  mapPins.appendChild(pinsList);
};

insertPins(pinsData);
