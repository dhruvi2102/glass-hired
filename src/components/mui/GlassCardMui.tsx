import { ReactNode } from 'react';
import { Card, CardContent, CardProps, SxProps, Theme } from '@mui/material';
import { glassStyles } from '@/theme/muiTheme';

interface GlassCardMuiProps extends Omit<CardProps, 'onClick'> {
  children: ReactNode;
  hover?: boolean;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

const GlassCardMui = ({ children, hover = false, onClick, sx, ...props }: GlassCardMuiProps) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        ...glassStyles.glassCard,
        ...(hover && glassStyles.glassCardHover),
        ...sx,
      }}
      {...props}
    >
      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
        {children}
      </CardContent>
    </Card>
  );
};

export default GlassCardMui;
