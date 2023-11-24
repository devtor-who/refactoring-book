import { Invoice, Performance, invoices } from './assets/invoices';
import { Play, Plays, plays } from './assets/plays';

/**
 * 예제 1. 다양한 연극을 외로 받아서 공연하는 극단이 있다고 가정해보자
 *        요청이 들어오면 연극의 장르와 관객 규모를 기초로 비용을 측정한다.
 *        장르는 2가지 비극과 희극만 공연하며 포인트제를 운영한다.
 *
 */
/**
 * 요구사항 1. 청구내역을 HTML로 출력하기
 * 요구사항 2. 더욱 다양한 공연장르 추가 및 그에 따른 계산로직 추가
 *
 *
 * 프로그램에 새로운 기능을 추가하기에 편한 구조가 아니라면,
 * 먼저 기능을 추가하기 쉬운 형태로 리펙터링한 이후 원하는 기능을 추가한다.
 *
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
 *
 * @update  리펙토링 첫번째
 *          - 함수 추출하기 ( switch 구문을 함수로 추출 )
 */
function statement(invoice: Invoice, plays: Plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer}) \n`;
  const format = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format;

  for (const perf of invoice.performances) {
    const play = plays[perf.playId];
    let thisAmount = amountFor(play, perf);

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

/**
 * switch 구문을 추출한 함수
 *
 * @param play 극단에서 설정한 연극 정보
 * @param perf 실제로 진행한 공연 실적
 * @returns
 */
function amountFor(play: Play, aPerformance: Performance) {
  let result = 0;

  switch (play.type) {
    case 'tragedy': // 비극
      result = 40000;
      if (aPerformance.audience > 30) {
        result += (aPerformance.audience - 30) * 1000;
      }
      break;

    case 'comedy': // 희극
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + (aPerformance.audience - 20) * 500;
      }
      result += 300 * aPerformance.audience;
      break;

    default:
      throw new Error(`Unknown play type`);
  }

  return result;
}
