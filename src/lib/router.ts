type Route =
  | "/"
  | "/spotify-tracks"
  | "/track-features"
  | "/track-features/[id]"
  | "/genres"
  | "/recommendations";

type IdParam = Record<"id", string>;

type RouteParam = IdParam;

type DynamicRoute = {
  pathname: Route;
  params: RouteParam;
};

export type Href = Route | DynamicRoute;
