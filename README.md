# neo-design-patterns-hw-09

## Template Method + Iterators

### Як це працює
- `DataExporter` — абстрактний клас, що інкапсулює шаблонний метод `export()`.
- Підкласи `CsvExporter`, `JsonExporter`, `XmlExporter` реалізують форматування й збереження.
- Додатково `XmlExporter` додає коментар про час експорту.

### Запуск експорту:
```bash
npx ts-node ./src/main.ts
```

Це створить файли:
- `./dist/users.csv`
- `./dist/users.json`
- `./dist/users.xml`

### Ітератори
- `CsvIterator`, `JsonIterator`, `XmlIterator` дозволяють обхід збережених даних через `for...of`

```ts
for (const user of new CsvIterator('./dist/users.csv')) {
  console.log(user);
}
```

### Додати новий формат експорту
1. Наслідувати `DataExporter`
2. Реалізувати `render()` і `save()`
3. Додати екземпляр до `main.ts`
