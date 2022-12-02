import merge from 'lodash/merge';
// @mui
import { useTheme, alpha } from '@mui/material/styles';

const LABEL_TOTAL = (theme) => ({
  show: true,
  label: 'Total',
  color: theme.palette.text.secondary,
  fontSize: theme.typography.subtitle2.fontSize,
  fontWeight: theme.typography.subtitle2.fontWeight,
  lineHeight: theme.typography.subtitle2.lineHeight,
});

const LABEL_VALUE = (theme) => ({
  offsetY: 8,
  color: theme.palette.text.primary,
  fontSize: theme.typography.h3.fontSize,
  fontWeight: theme.typography.h3.fontWeight,
  lineHeight: theme.typography.h3.lineHeight,
});

const COLOR = (theme) => ([
  theme.palette.primary.main,
  theme.palette.warning.main,
  theme.palette.info.main,
  theme.palette.error.main,
  theme.palette.success.main,
  theme.palette.warning.dark,
  theme.palette.success.darker,
  theme.palette.info.dark,
  theme.palette.info.darker
]);

const CHART = (theme) => ({
  toolbar: { show: false },
  zoom: { enabled: false },
  // animations: { enabled: false },
  foreColor: theme.palette.text.disabled,
  fontFamily: theme.typography.fontFamily,
})

const STATES = {
  hover: {
    filter: {
      type: 'lighten',
      value: 0.04,
    },
  },
  active: {
    filter: {
      type: 'darken',
      value: 0.88,
    },
  },
}

const FILL = {
  opacity: 1,
  gradient: {
    type: 'vertical',
    shadeIntensity: 0,
    opacityFrom: 0.4,
    opacityTo: 0,
    stops: [0, 100],
  },
}

const STROKE = {
  width: 3,
  curve: 'smooth',
  lineCap: 'round',
}

const GRID = (theme) => ({
  strokeDashArray: 3,
  borderColor: theme.palette.divider,
})

const XAXIS = {
  axisBorder: { show: false },
  axisTicks: { show: false },
}

const MARKERS = (theme) => ({
  size: 0,
  strokeColors: theme.palette.background.paper,
});

const TOOLTIP = {
  x: {
    show: false,
  },
}

const LEGEND = (theme) => ({
  show: true,
  fontSize: String(13),
  position: 'top',
  horizontalAlign: 'right',
  markers: {
    radius: 12,
  },
  fontWeight: 500,
  itemMargin: { horizontal: 12 },
  labels: {
    colors: theme.palette.text.primary,
  },
});

const PLOT_OPTIONS= (theme) => ({
  // Bar
  bar: {
    borderRadius: 4,
    columnWidth: '28%',
  },

  // Pie + Donut
  pie: {
    donut: {
      labels: {
        show: true,
        value: LABEL_VALUE(theme),
        total: LABEL_TOTAL(theme),
      },
    },
  },

  // Radialbar
  radialBar: {
    track: {
      strokeWidth: '100%',
      background: alpha(theme.palette.grey[500], 0.16),
    },
    dataLabels: {
      value: LABEL_VALUE(theme),
      total: LABEL_TOTAL(theme),
    },
  },

  // Radar
  radar: {
    polygons: {
      fill: { colors: ['transparent'] },
      strokeColors: theme.palette.divider,
      connectorColors: theme.palette.divider,
    },
  },

  // polarArea
  polarArea: {
    rings: {
      strokeColor: theme.palette.divider,
    },
    spokes: {
      connectorColors: theme.palette.divider,
    },
  },
})

const RESPONSIVE = (theme) => ([
  {
    // sm
    breakpoint: theme.breakpoints.values.sm,
    options: {
      plotOptions: { bar: { columnWidth: '40%' } },
    },
  },
  {
    // md
    breakpoint: theme.breakpoints.values.md,
    options: {
      plotOptions: { bar: { columnWidth: '32%' } },
    },
  },
]);

export default function useChart(options) {
  const theme = useTheme();
  const baseOptions = {
    colors: COLOR(theme),
    chart: CHART(theme),
    states: STATES,
    fill: FILL,
    dataLabels: { enabled: false },
    stroke: STROKE,
    grid: GRID(theme),
    xaxis: XAXIS,
    markers: MARKERS(theme),
    tooltip: TOOLTIP,
    legend: LEGEND(theme),
    plotOptions: PLOT_OPTIONS(theme),
    responsive: RESPONSIVE(theme),
  };

  return merge(baseOptions, options);
}