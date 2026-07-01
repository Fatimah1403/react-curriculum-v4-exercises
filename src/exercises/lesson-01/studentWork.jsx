//Lesson-01 Introduction to React
//Exercise: Build an "About Me" Component in this file

export default function StudentWork() {
  const name = 'Fatimah Hassan';
  const age = 34;
  const hobbies = [
    { id: 1, hobby: 'Reading' },
    { id: 2, hobby: 'Learning new things' },
    { id: 3, hobby: 'Cooking' },
    { id: 4, hobby: 'Playing games' },
  ];

  return (
    <div>
      <h1>Hi, I&apos;m {name} 👋</h1>
      <p>
        I&apos;m a {age}-year-old mother of three and a lifelong learner with a
        Master&apos;s degree, now diving into the world of software development.
        I joined CodeTheDream because I believe it&apos;s never too late to
        build something new — and I&apos;m here to prove that to myself and my
        kids. When I&apos;m not studying or chasing after my little ones,
        you&apos;ll find me lost in a good book, experimenting in the kitchen,
        or learning something I didn&apos;t know yesterday.
      </p>
      <h2>My Hobbies</h2>
      <ul>
        {hobbies.map((hob) => (
          <li key={hob.id}>{hob.hobby}</li>
        ))}
      </ul>
    </div>
  );
}
