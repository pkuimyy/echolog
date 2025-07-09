export function cn(...classes: (string | false | null | undefined)[]) {
  const classList = classes
    .filter((c): c is string => typeof c === 'string' && c.length > 0) // 断言只保留非空字符串
    .flatMap(c => c.split(/\s+/));

  const replaceCategories = [
    { name: 'bg', regex: /^bg-/ },
    { name: 'text', regex: /^text-/ },
    { name: 'border', regex: /^border-/ },
  ];

  const latestClassByCategory = new Map<string, string>();
  const others: string[] = [];

  for (const cls of classList) {
    const category = replaceCategories.find(cat => cat.regex.test(cls));
    if (category) {
      latestClassByCategory.set(category.name, cls);
    } else {
      others.push(cls);
    }
  }

  return [...latestClassByCategory.values(), ...others].join(' ');
}
