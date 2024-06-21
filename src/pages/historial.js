import React, { useState } from 'react';
import History from '@/components/History';
import { Accordion, AccordionSummary, Typography, Container, Card, CardContent, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const HistoryPage = () => {
  const [openPurchase, setOpenPurchase] = useState(null);

  const handlePurchaseClick = (purchaseNumber) => {
    setOpenPurchase(openPurchase === purchaseNumber ? null : purchaseNumber);
  };

  const isPurchaseOpen = (purchaseNumber) => {
    return openPurchase === purchaseNumber;
  };

  return (
    <Box minHeight="100vh" >
      <Typography variant="h3" align="center" gutterBottom>
        Historial de Compras
      </Typography>
      <Container maxWidth="md" sx={{ mp: '20px', bgcolor: 'grey.800', padding: '20px', borderRadius: '10px', margin: 'auto' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((purchase) => (
          <Card key={purchase} variant="outlined" sx={{ marginBottom: '10px', borderRadius: '10px' }}>
            <Accordion
              expanded={isPurchaseOpen(purchase)}
              onChange={() => handlePurchaseClick(purchase)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${purchase}-content`}
                id={`panel-${purchase}-header`}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Compra {purchase}
                </Typography>
              </AccordionSummary>
              <CardContent>
                <History />
              </CardContent>
            </Accordion>
          </Card>
        ))}
      </Container>
    </Box>
  );
};

export default HistoryPage;
