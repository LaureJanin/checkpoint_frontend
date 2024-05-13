import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { Country } from "../../types";
import Header from "@/components/Header";
import { queryCountryByCode } from "@/graphql/queryCountryByCode";

const Country = (props: Country): React.ReactNode => {
  const router = useRouter();
  const code = router.query.country;

  const { loading, error, data } = useQuery<{ country: Country }>(
    queryCountryByCode,
    {
      variables: { code: code },
    }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || !data.country) return <div>Country not found</div>;

  const country = data.country;

  return (
    <Header>
      <div>
        <h1>{country.name}</h1>
        <p>{country.emoji}</p>
        <p>Code: {country.code}</p>
        <p>Continent: {country.continent.name}</p>
      </div>
    </Header>
  );
};

export default Country;
