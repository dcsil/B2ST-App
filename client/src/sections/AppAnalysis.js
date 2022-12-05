// @mui
import PropTypes from 'prop-types';
import { Box, Card, Paper, Typography, CardHeader, CardContent, Input } from '@mui/material';
import InputTable from '../components/table/InputTable';
// ----------------------------------------------------------------------

AppAnalysis.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppAnalysis({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <CardContent>
        <InputTable />
      </CardContent>
    </Card>
  );
}