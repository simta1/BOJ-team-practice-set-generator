// ==UserScript==
// @name         백준 연습셋 생성
// @namespace    http://tampermonkey.net/
// @version      2024-10-28
// @description  try to take over the world!
// @author       You
// @match        https://www.acmicpc.net/group/workbook/create*
// @match        https://www.acmicpc.net/group/practice/create*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=acmicpc.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const problems = [];

    const problemTable = window.location.href.includes("/workbook") ? document.querySelector("body > div.wrapper > div.container.content > div.row > form > div.col-md-8 > div:nth-child(2)")
        : window.location.href.includes("/practice") ? document.querySelector("#problem_form > div:nth-child(1)")
            : null;

    const cntDisplay = document.createElement("span");
    cntDisplay.textContent = `남은 문제 수 : ${problems.length}개`;

    if (problemTable) {
        const myInputBox = document.createElement('input');
        myInputBox.type = 'text';
        myInputBox.placeholder = '준호야 공부하자! 문제 번호 입력(쉼표로 구별)';
        myInputBox.style.marginBottom = '10px';
        myInputBox.style.width = '100%';
        myInputBox.style.height = '40px';
        myInputBox.style.backgroundColor = '#f0f0f0';
        myInputBox.style.border = '1px solid #ccc';
        myInputBox.style.borderRadius = '4px';
        myInputBox.style.padding = '10px';

        myInputBox.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' && myInputBox.value.length) {
                problems.push(...myInputBox.value.split(',').map(num => num.trim()));
                problems.sort(() => Math.random() - 0.5);
                cntDisplay.textContent = `남은 문제 수 : ${problems.length}개`;
                myInputBox.value = '';
            }
        });

        problemTable.parentNode.insertBefore(myInputBox, problemTable);
        problemTable.parentNode.insertBefore(cntDisplay, problemTable);
    }

    const realInputBox = window.location.href.includes("/workbook") ? document.querySelector("body > div.wrapper > div.container.content > div.row > form > div.col-md-8 > div:nth-child(4) > div > input")
        : window.location.href.includes("/practice") ? document.querySelector("#problem-search")
            :null;

    if (realInputBox) {
        realInputBox.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' && problems.length) {
                realInputBox.focus();
                realInputBox.value = problems.pop();
                cntDisplay.textContent = `남은 문제 수 : ${problems.length}개`;
                realInputBox.dispatchEvent(new Event('input'));
            }
        });
    }


})();