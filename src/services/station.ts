import { CardStation } from '@/types';

export const getLatestStations = async (limit: number = 3): Promise<{ data: CardStation[] }> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_INSTANT_FUEL}?select=id%2Cadresse%2Ccp%2Cville%2Cgazole_maj%20as%20update%2Cgazole_prix%2Cgazole_prix%2Csp95_prix%2Ce85_prix%2Cgplc_prix%2Ce10_prix%2Csp98_prix%2Ccarburants_disponibles%2Ccarburants_indisponibles%2Cservices_service&order_by=gazole_maj%20DESC&limit=${limit}`
  );
  const { results } = await response.json();

  return { data: results };
};

export const getStationById = async (id: number): Promise<{ data: CardStation[] }> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_INSTANT_FUEL}?select=id%2Cadresse%2Ccp%2Cville%2Cgazole_maj%20as%20update%2Cgazole_prix%2Cgazole_prix%2Csp95_prix%2Ce85_prix%2Cgplc_prix%2Ce10_prix%2Csp98_prix%2Ccarburants_disponibles%2Ccarburants_indisponibles%2Cservices_service&where=id%3D${id}&limit=5`
  );
  const { results } = await response.json();

  return { data: results };
};

/**
 * Get the nereasts stations based on postal code and department code. If the results using the postal code is less than the limit fixed (maximum 100) then it will use the department code to expand the query
 * @param postalCode
 * @param departmentCode
 * @param limit
 */
export const getNearestStations = async (
  postalCode: number,
  departmentCode: number,
  limit: number = 5
): Promise<{ data: CardStation[] }> => {
  // first fetch by postal code and if results < limit then do by departments
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_INSTANT_FUEL}?select=id%2Cadresse%2Ccp%2Cville%2Cgazole_maj%20as%20update%2Cgazole_prix%2Csp95_prix%2Ce85_prix%2Cgplc_prix%2Ce10_prix%2Csp98_prix%2Ccarburants_disponibles%2Ccarburants_indisponibles%2Cservices_service&where=code_departement%3D%22${departmentCode}%22&limit=${limit}`
  );
  const { results } = await response.json();

  // if (results.length === limit) {
  return { data: results };
  // }

  // const responseDepartment = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_INSTANT_FUEL}?select=id%2Cadresse%2Ccp%2Cville%2Cgazole_maj%20as%20update%2Cgazole_prix%2Csp95_prix%2Ce85_prix%2Cgplc_prix%2Ce10_prix%2Csp98_prix%2Ccarburants_disponibles%2Ccarburants_indisponibles%2Cservices_service&where=code_departement%3D${departmentCode}&limit=${limit - results.length}`
  // );
  // const { results: resultDepartment } = await responseDepartment.json();
  //
  // return { data: results.concat(resultDepartment) };
};
