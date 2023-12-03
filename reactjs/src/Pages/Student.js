import "../App.css";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function Student() {
  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [values, setValues] = useState({
    name: "",
    class: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/api/v1"
      : process.env.REACT_APP_BASE_URL;

  let ignore = false;
  useEffect(() => {
    if (!ignore) {
      getStudent();
    }
    return () => {
      ignore = true;
    };
  }, []);

  const getStudent = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/students/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log({ data });
          // const { name, class } = data;
          setValues({
            name: data.name,
            class: data.class,
          });
        });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const updateStudent = async () => {
    try {
      await fetch(`${API_BASE}/students/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
        });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async () => {
    try {
      await fetch(`${API_BASE}/students/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          setStudents(data);
          navigate("/dashboard", { replace: true });
        });
    } catch (error) {
      setError(error.message || "Unexpected Error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    updateStudent();
  };

  const handleInputChanges = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Students Profile</h1>
        <h5>{values && values.name}</h5>
        <p>{values && values.class}</p>
        <button onClick={() => deleteStudent()}>Delete Student</button>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/">Home</Link>

        <form onSubmit={(event) => handleSubmit(event)}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleInputChanges}
            />
          </label>
          <label>
            Class:
            <input
              type="text"
              name="class"
              value={values.class}
              onChange={handleInputChanges}
            />
            <input type="submit" value="Submit" />
          </label>
        </form>
      </header>
    </div>
  );
}

export default Student;
