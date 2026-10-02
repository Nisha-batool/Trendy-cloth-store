import { draggingSlider } from "./dragging-slider.js";
import { saveToLocalStorage } from "./saveToLocalStorage.js";
import { saveButtonClick } from "./save-click-buttons.js";
import { activeLiveProduct } from "./active-live-product.js";

let lovedData: any;
async function fetchData() {
  let result = await fetch("data/data-feature-clothes.json");
  let myData = await result.json();

  let sliceData = myData.slice(5);
  lovedData = sliceData;

  generateDataClothesOne(sliceData);
  saveButtonClick();
  activeLiveProduct();

  let listClothesOne = document.querySelector(".clothes-list-two") as HTMLElement;
  draggingSlider(listClothesOne);
}

window.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

let listClothesOne = document.querySelector(".clothes-list-two") as HTMLElement;

function generateDataClothesOne(data: object[]) {
  listClothesOne.innerHTML = data
    .map((item: any, index: any) => {
      let { id, img, title } = item;

      return `
      <li class="${id}">
        <div class="love-icon" data-ion="${id}" data-ind="${index}">
          <ion-icon name="heart-outline"></ion-icon>
        </div>
        <figure class="cloth-image">
          <img src="${img}" draggable="false" alt="" />
        </figure>
        <div class="cloth-title">
          <h1>${title}</h1>
          <p>$7.99 <del>$14.99</del></p>
          <ul class="icons-cloth-list">
            <li><ion-icon name="star-outline"></ion-icon></li>
            <li><ion-icon name="star-outline"></ion-icon></li>
            <li><ion-icon name="star-outline"></ion-icon></li>
            <li><ion-icon name="star-outline"></ion-icon></li>
            <li><ion-icon name="star-half-outline"></ion-icon></li>
          </ul>
        </div>
      </li>
    `;
    })
    .join("");

  listClothesOne.addEventListener("click", (e: any) => {
    let element: any = e.target.closest(".love-icon");

    if (element) {
      let index = element.dataset.ind;
      if (localStorage.getItem("SignData")) {
        saveToLocalStorage(lovedData, index);
      } else {
        location.href = "signUp.html";
      }
    }
  });
}
