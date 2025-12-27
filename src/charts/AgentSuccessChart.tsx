import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { agent: "Amit", success: 92 },
  { agent: "Riya", success: 88 },
  { agent: "John", success: 95 },
  { agent: "Sara", success: 90 },
];

export default function AgentSuccessChart() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Agent Success Rate (%)
        </Typography>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="agent" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="success" fill="#22c55e" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
