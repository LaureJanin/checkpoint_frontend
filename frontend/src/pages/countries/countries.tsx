import React from "react";
import { Country } from "../../types";
import { useQuery } from "@apollo/client";
import { queryAllCountries } from "@/graphql/queryAllCountries";
import Header from "@/components/Header";
import Link from "next/link";

const Countries = (): React.ReactNode => {
  const { loading, error, data } = useQuery<{ countries: Country[] }>(
    queryAllCountries
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || !data.countries) return <div>Countries not found</div>;

  const countries = data.countries;

  return (
    <Header>
      <div>
        {countries.map((country) => (
          <div key={country.id}>
            <Link href={`/countries/${country.code}`}>
              <h3>{country.name}</h3>
            </Link>
            <p>{country.emoji}</p>
            <p>Code: {country.code}</p>
            <p>
              {country.continent && <p>Continent: {country.continent.name}</p>}
            </p>
          </div>
        ))}
      </div>
    </Header>
  );
};

export default Countries;
