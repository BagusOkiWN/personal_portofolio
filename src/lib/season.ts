/**
 * Konfigurasi & Utility Musim Salju / Musim Dingin (Winter Season).
 * 
 * Bulan dalam JavaScript:
 * 0 = Januari, 1 = Februari, ..., 10 = November, 11 = Desember
 * 
 * Periode aktif default:
 * November (10), Desember (11), Januari (0), Februari (1)
 */
export const WINTER_MONTHS = [10, 11, 0, 1]

export function isWinterSeason(
  activeMonths: number[] = WINTER_MONTHS,
  forceEnable = false
): boolean {
  if (forceEnable) return true
  const currentMonth = new Date().getMonth()
  return activeMonths.includes(currentMonth)
}
