 enum Sizes {
    Small = 'S',
    Medium = 'M',
    Large = 'L',
  }
  
  function getKeyByValue(value: string) {
    const indexOfS = Object.values(Sizes).indexOf(value as unknown as Sizes);
  
    const key = Object.keys(Sizes)[indexOfS];
  
    return key;
  }
  
  console.log(getKeyByValue('S')); // 👉️ Small
  console.log(getKeyByValue('M')); // 👉️ Medium
  