// @mui
import PropTypes from 'prop-types';
import { Box, Card, Paper, Typography, CardHeader, CardContent, Input } from '@mui/material';
import InputTable from '../components/table/InputTable';
// ----------------------------------------------------------------------

AppAnalysis.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array,
};

export default function AppAnalysis({ title, list,subheader, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <CardContent>
        <InputTable />
      </CardContent>
    </Card>
  );
}