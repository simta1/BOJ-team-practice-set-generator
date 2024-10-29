// ==UserScript==
// @name         백준 표 문제번호 추출
// @namespace    http://tampermonkey.net/
// @version      2024-10-28
// @description  try to take over the world!
// @author       You
// @match        https://www.acmicpc.net/category/detail*
// @match        https://www.acmicpc.net/workbook/view*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=acmicpc.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 표 전체 담고 있는 div태그 위치
    const tableContainer = window.location.href.includes("/category") ? document.querySelector("body > div.wrapper > div.container.content > div:nth-child(5)")
        : window.location.href.includes("/workbook") ? document.querySelector("body > div.wrapper > div.container.content > div.row > div:nth-child(3)")
            : null;

    if (tableContainer) {
        const firstColumnValues = Array.from(tableContainer.querySelectorAll("tbody tr")).map(row => {
            return row.querySelector("td:first-child").innerText;
        });
        const firstColumnText = `준호야 공부하자!\n추출된 문제 번호 : \n${firstColumnValues.join(", ")}`;

        // 표 위에 출력
        const header = document.createElement("div");
        header.innerText = firstColumnText;
        header.style.fontWeight = "bold";
        header.style.marginBottom = "10px";
        header.style.backgroundColor = "#f0f0f0";
        header.style.padding = "10px";

        tableContainer.parentNode.insertBefore(header, tableContainer);
    } else {
        // alert("표 없음, 선택자 확인");
    }
})();