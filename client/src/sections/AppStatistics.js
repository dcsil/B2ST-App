// @mui
import PropTypes from 'prop-types';
import { Box, Card, Paper, Typography, CardHeader, CardContent } from '@mui/material';

// ----------------------------------------------------------------------

AppStatistics.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppStatistics({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <CardContent>
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(2, 1fr)'}}>
          {list.map((item) => (
            <Paper key={item.name} variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
              <Typography variant="h6">{item.value}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>{item.name}</Typography>
            </Paper>))}
        </Box>
      </CardContent>
    </Card>
  );
}