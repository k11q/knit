export function useCreateId() {
  const uid = () =>
    String(Date.now().toString(32) + Math.random().toString(16)).replace(
      /\./g,
      ""
    );

  const getRandomLetter = () => {
    return String.fromCharCode(97 + Math.floor(Math.random() * 26));
  };

  return getRandomLetter() + uid();
}
