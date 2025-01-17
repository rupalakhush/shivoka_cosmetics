import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

// Destructure props sizee and thicknesss from the props object
export default function Loaderr({ sizee, thicknesss }) {
  return (
    <div>
      <Stack spacing={0} sx={{ flexGrow: 10 }}>
        <React.Fragment>
          <svg width={0} height={0} className="bg-red-300">
            <defs>
              <linearGradient
                id="my_gradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#e01cd5" />
                <stop offset="100%" stopColor="#1CB5E0" />
              </linearGradient>
            </defs>
          </svg>
          <CircularProgress
            size={sizee || 50} // Increase this value to make the loader larger
            thickness={thicknesss || 4} // Optionally adjust the thickness
            sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
          />
        </React.Fragment>
      </Stack>
    </div>
  );
}
