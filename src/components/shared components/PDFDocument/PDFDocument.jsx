import React from "react";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  PDFViewer,
} from "@react-pdf/renderer";
const PDFDocument = () => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "white",
      justifyContent: "center",
      paddingVertical: 28,
    },
    section: {
      margin: 10,
      borderWidth: 1,
      borderColor: "black",
      borderTopWidth: 0,
    },
    snoStyle: {
      width: 50,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderColor: "black",
      padding: 5,
    },
    nameStyle: {
      width: 155,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderColor: "black",
      padding: 5,
    },
    dateStyle: {
      width: 100,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderColor: "black",
      padding: 5,
    },
    categoryStyle: {
      width: 105,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderColor: "black",
      padding: 5,
    },
    amountStyle: {
      width: 105,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderColor: "black",
      padding: 5,
    },
  });
  return (
    <PDFViewer style={{ height: 500, width: 500, margin: 40 }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <View style={{ flexDirection: "row", maxHeight: 44 }}>
              <Text style={styles.snoStyle}>SNo.</Text>
              <Text style={styles.nameStyle}>Expense Name</Text>
              <Text style={styles.dateStyle}>Date</Text>
              <Text style={styles.categoryStyle}>Category</Text>
              <Text style={styles.amountStyle}>Amount</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.snoStyle}>1.</Text>
              <Text style={styles.nameStyle}>petrol cost</Text>
              <Text style={styles.dateStyle}>12/11/2021</Text>
              <Text style={styles.categoryStyle}>Fuel</Text>
              <Text style={styles.amountStyle}>1000.00</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFDocument;
