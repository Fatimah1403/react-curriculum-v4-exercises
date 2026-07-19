const SnackList = () => {
  // Each snack has a name and a rank (1 = favorite).
  // Starting order: least favorite (rank 5) -> most favorite (rank 1)
  const snacks = [
    { name: 'Doughnut', rank: 5 },
    { name: 'Fish Roll', rank: 4 },
    { name: 'Icecream', rank: 3 },
    { name: 'Biscuit', rank: 2 },
    { name: 'Pofpof', rank: 1 },
  ];

  const sortedSnacks = snacks.toSorted((a, b) => a.rank - b.rank);

  return (
    <ol>
      {sortedSnacks.map((snack) => (
        <li key={snack.rank}>
          #{snack.rank} — {snack.name}
        </li>
      ))}
    </ol>
  );
};

export default SnackList;
