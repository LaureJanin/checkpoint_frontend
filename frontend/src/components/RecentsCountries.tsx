import React, { useState } from "react";
import { Country } from "../types";
import { useMutation, useQuery } from "@apollo/client";
import { queryAllCountries } from "@/graphql/queryAllCountries";
import { mutationCreatedCountry } from "@/graphql/mutationCreateCountry";

const RecentsCountries = (): React.ReactNode => {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [code, setCode] = useState("");

  const { loading, error, data } = useQuery<{ countries: Country[] }>(
    queryAllCountries
  );

  const [createCountry] = useMutation<{ addCountry: Country[] }>(
    mutationCreatedCountry,
    {
      refetchQueries: [{ query: queryAllCountries }],
    }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || !data.countries) return <div>Countries not found</div>;

  const countries = data.countries;

  const addCountry = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCountry({
        variables: {
          data: {
            name,
            emoji,
            code,
          },
        },
      });
      setName("");
      setEmoji("");
      setCode("");
    } catch (error) {
      console.error("Error creating country:", error);
    }
  };

  return (
    <div>
      <form onSubmit={addCountry}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="emoji">Emoji:</label>
          <input
            type="text"
            id="emoji"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="code">Code:</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Country</button>
      </form>
      <ul>
        {countries.map((country) => (
          <li key={country.id}>
            <span>{country.name}</span>
            <span>{country.emoji}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentsCountries;
