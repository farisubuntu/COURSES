import { useState, useEffect } from "react";


function useFetch({ url }) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [quizzes, setQuizzes] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.statusText);
        const json = await res.json();
        setIsPending(false);
        setError(null);
        setLesson({ ...json.lesson });
        setQuizzes([...json.quizzes]);

      } catch (error) {
        setError(`${error} Could not fetch the data `);
        setIsPending(false);

      }
    }

    fetchData();

  }, [url]);
  return { lesson, quizzes, isPending, error }
};



export default useFetch;