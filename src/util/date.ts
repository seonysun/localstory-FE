type Option = {
  label: string;
  value: string;
};

export function getYearOptions(start = 2025, end = 2027): Option[] {
  return Array.from({ length: end - start + 1 }, (_, i) => {
    const year = `${start + i}`;
    return { label: `${year}년`, value: year };
  });
}

export function getMonthOptions(): Option[] {
  return Array.from({ length: 12 }, (_, i) => {
    const month = String(i + 1).padStart(2, '0');
    return { label: `${month}월`, value: month };
  });
}

export function getDayOptions(): Option[] {
  return Array.from({ length: 31 }, (_, i) => {
    const day = String(i + 1).padStart(2, '0');
    return { label: `${day}일`, value: day };
  });
}

export function getToday() {
  const today = new Date();
  const year = today.getFullYear().toString();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return { year, month, day };
}

export function formatDate(date: string | Date): string {
  const day = new Date(date);
  return day.toISOString().slice(0, 10);
}

export function formatDotDate(date: string | Date): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();

  return `${year}.${month}.${day}`;
}
