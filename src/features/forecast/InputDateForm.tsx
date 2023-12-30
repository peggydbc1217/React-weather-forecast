import { useState } from "react";
//UI
import { AutoComplete } from "primereact/autocomplete";
import { Tag } from "primereact/tag";
import styled from "styled-components";
import { Button } from "../../styles/Button";
import toast from "react-hot-toast";

//Redux
import { useForecastDispatch } from "../../store/hooks";
import {
  setWeatherData,
  setCurrentCity,
  setIsLoading,
  setCurrentCountry,
} from "./forecastSlice";

//Form
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { getCityList } from "../../helpers/api";
import { getCityGeoCode } from "../../helpers/api";
import { getForecast } from "../../helpers/api";

//firbse custom hook
import useAddSearchedCity from "../../hooks/useAddSearchedCity";
import useGetSearchedCity from "../../hooks/useGetSearchedCity";

// zod schema for form validation
const schema = z.object({
  cityName: z
    .string()
    .min(1, { message: "cityName is required" })
    .refine((value) => /^[a-zA-Z\s]*$/.test(value), {
      message: "City name can only contain letters and spaces",
    }),
});
type Schema = z.infer<typeof schema>;
const defaultValues = { cityName: "" };

//Styled Components
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  gap: 8px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledLabel = styled.label`
  color: #333;
  font-size: 1.5rem;
  font-weight: 700;
`;

export interface CityGeoCode {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  population: number;
  is_capital: boolean;
}

//Component
export default function InputDataForm() {
  //autocomplete states
  const [cities, setcities] = useState<CityGeoCode[]>([]);
  const suggestions = cities.map((city) => city.name);
  //redux states
  const dispatch = useForecastDispatch();
  //firebase custom hook
  const { addSearchedCity } = useAddSearchedCity();
  //firbase get searched city
  const { searchedCities } = useGetSearchedCity();
  console.log(searchedCities);

  //react-hook-form
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    control,
    reset,
  } = useForm<Schema>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  //Success and Error message
  const showSuccess = () => {
    toast.success("Forecast data loaded successfully");
  };

  const showErrorMessage = (name: string) => {
    if (Object.keys(errors).includes(name)) {
      return (
        <Tag
          severity="danger"
          value={errors.cityName?.message}
          className="error-tag"
        ></Tag>
      );
    }
  };

  //AutoComplete fetch suggestions
  const search = async (e: { query: string }) => {
    try {
      const res = await getCityList(e.query);
      setcities(res);
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    }
  };

  //AutoComplete item UI template
  const itemTemplate = (__: string, index: number) => {
    return (
      <FlexContainer>
        <span className={`fi fi-${cities[index].country.toLowerCase()}`}></span>
        <div>{cities[index].name}</div>
      </FlexContainer>
    );
  };

  //Form Submit
  const onSubmit = async (data: Schema) => {
    try {
      dispatch(setIsLoading(true));
      const { lat, lon } = await getCityGeoCode(data.cityName);
      if (lat === 0 && lon === 0) {
        throw new Error("City not found");
      }
      const res = await getForecast(lat, lon);

      dispatch(setCurrentCity(data.cityName));
      dispatch(setCurrentCountry(res.currentCountry));
      dispatch(setWeatherData(res.weatherData));
      addSearchedCity(data.cityName, lat, lon);
      showSuccess();
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      }
    } finally {
      reset();
      dispatch(setIsLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="forecast-form">
      <Controller
        name="cityName"
        control={control}
        rules={{ required: "cityName is required." }}
        render={({ field }) => {
          return (
            <Container>
              <FlexContainer>
                {searchedCities.length > 0 &&
                  searchedCities.map((searchedcity) => (
                    <Button
                      $tertiary
                      key={searchedcity}
                      onClick={() => setValue("cityName", searchedcity)}
                    >
                      {searchedcity}
                    </Button>
                  ))}
              </FlexContainer>
              <StyledLabel htmlFor="cityName">City Name</StyledLabel>
              <FlexContainer>
                <AutoComplete
                  field="name"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.value);
                  }}
                  suggestions={suggestions}
                  completeMethod={search}
                  itemTemplate={itemTemplate}
                />
                <Button type="submit" $medium>
                  Submit
                </Button>
              </FlexContainer>
              {showErrorMessage("cityName")}
            </Container>
          );
        }}
      />
    </form>
  );
}
