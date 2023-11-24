import { Invoice, invoices } from './assets/invoices';
import { Plays, plays } from './assets/plays';

/**
 * 예제 1. 다양한 연극을 외로 받아서 공연하는 극단이 있다고 가정해보자
 *        요청이 들어오면 연극의 장르와 관객 규모를 기초로 비용을 측정한다.
 *        장르는 2가지 비극과 희극만 공연하며 포인트제를 운영한다.
 */
for (const invoice of invoices) {
  const result = statement(invoice, plays);
  console.log(result);
}

/**
 * 공연료를 출력한다.
 *
 * @param invoice - 청구서
 * @param plays   - 공연정보
 */
function statement(invoice: Invoice, plays: Plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer}) \n`;
  const format = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format;

  for (const perf of invoice.performances) {
    const play = plays[perf.playId];
    let thisAmount = 0;

    switch (play.type) {
      case 'tragedy': // 비극
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += (perf.audience - 30) * 1000;
        }
        break;

      case 'comedy': // 희극
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + (perf.audience - 20) * 500;
        }
        thisAmount += 300 * perf.audience;
        break;

      default:
        throw new Error(`Unknown play type`);
    }

    volumeCredits += Math.max(perf.audience - 30, 0);
    if (play.type === 'comedy') {
      volumeCredits += Math.floor(perf.audience / 5);
    }

    result += ` ${play.name}: ${format(thisAmount)} (${perf.audience}석)  \n`;
    totalAmount += thisAmount;
  }

  result += `총액: ${format(totalAmount)}\n`;
  result += `적립포인트: ${volumeCredits}점\n`;
  return result;
}
