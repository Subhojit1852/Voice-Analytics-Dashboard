import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", duration: 180 },
  { day: "Tue", duration: 210 },
  { day: "Wed", duration: 195 },
  { day: "Thu", duration: 230 },
  { day: "Fri", duration: 205 },
];

export default function AvgCallDurationChart() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Avg Call Duration (sec)
        </Typography>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="duration"
              stroke="#f97316"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
