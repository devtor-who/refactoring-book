import { Invoice, Performance, invoices } from './assets/invoices';
import { Plays, playFor, plays } from './assets/plays';

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
 *          - 변수 이름 변경하기
 *          - 임시 변수를 질의 함수로 바꾸기 ( play 변수 제거하기 )
 *          - 변수 인라인하기 ( thisAmount )
 *          - 적립 포인트 계산 추출하기
 *          - format 변수 제거하기 ( 함수로 추출 )
 *          - volumeCredits, totalAmout 변수 제거하기 ( 반복문쪼개기, 함수로 추출 )
 */
function statement(invoice: Invoice, plays: Plays) {
  let result = `청구 내역 (고객명: ${invoice.customer}) \n`;

  for (const perf of invoice.performances) {
    result += ` ${playFor(perf).name}: ${krw(amountFor(perf))} (${perf.audience}석)  \n`;
  }

  result += `총액: ${krw(totalAmount(invoice.performances))}\n`;
  result += `적립포인트: ${totalVolumeCredits(invoice.performances)}점\n`;
  return result;
}

/**
 * switch 구문을 추출한 함수
 *
 * @param play 극단에서 설정한 연극 정보
 * @param perf 실제로 진행한 공연 실적
 * @returns
 *
 */
function amountFor(aPerformance: Performance) {
  let result = 0;

  switch (playFor(aPerformance).type) {
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
      throw new Error(`Unknown play type: ${playFor(aPerformance)}`);
  }

  return result;
}

/**
 * 적립 포인트 계산 추출하기
 *
 * @param aPerformance
 */
function volumeCreditsFor(aPerformance: Performance) {
  let result = 0;
  result += Math.max(aPerformance.audience - 30, 0);
  if (playFor(aPerformance).type === 'comedy') {
    result += Math.floor(aPerformance.audience / 5);
  }
  return result;
}

/**
 * 화폐 단위 맞추기
 * @param value
 * @returns
 */
function krw(value: number) {
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);
}

function totalVolumeCredits(performances: Performance[]) {
  let result = 0;
  for (const perf of performances) {
    result += volumeCreditsFor(perf);
  }
  return result;
}

function totalAmount(performances: Performance[]) {
  let result = 0;
  for (const perf of performances) {
    result += amountFor(perf);
  }
  return result;
}
