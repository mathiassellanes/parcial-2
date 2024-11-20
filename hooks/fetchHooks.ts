import { getAllPlanets, getPlanetById } from "@/api"
import { Planet } from "@/types/planet";
import { useEffect, useState } from "react";

export const usePlanets = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);

  const fetchPlanets = async () => {
    const planets = await getAllPlanets();
    setPlanets(planets);
  };

  useEffect(() => {
    fetchPlanets();
  }, []);

  return { planets, fetchPlanets };
}

export const usePlanetById = (id: number) => {
  const [planet, setPlanet] = useState<Planet | null>(null);

  const fetchPlanet = async () => {
    const planet = await getPlanetById(id);
    setPlanet(planet);
  };

  useEffect(() => {
    fetchPlanet();
  }, [id]);

  return { planet, fetchPlanet };
}
