import React from "react";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  PDFViewer,
} from "@react-pdf/renderer";
import moment from "moment";
import { useSelector } from "react-redux";
import { userStoreSelector } from "../../../store/stores.selector";
import { COLORS } from "../../../constants/Colors";
const PDFDocument = ({ expenses, message }) => {
  const userStore = useSelector(userStoreSelector);
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#f0fff3",
      justifyContent: "center",
      paddingVertical: 28,
    },
    section: {
      margin: 10,
    },
    snoStyle: {
      width: 50,
      padding: 5,
      fontSize: 12,
    },
    nameStyle: {
      width: 255,
      fontSize: 12,
    },
    dateStyle: {
      width: 100,
      padding: 5,
      fontSize: 12,
    },
    categoryStyle: {
      width: 105,
      padding: 5,
      fontSize: 12,
    },
    amountStyle: {
      width: 105,
      padding: 5,
      fontSize: 12,
    },
  });
  return (
    <PDFViewer style={{ height: 736, width: "80%", margin: 40 }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <View
              style={{
                flexDirection: "column",
                margin: 2,
                borderBottomWidth: 1,
                paddingBottom: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  color: COLORS.primary,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                User Expenses
              </Text>
              <Text style={{ fontSize: 12, color: COLORS.darkPrimary }}>
                User Name : {userStore.data.name}
              </Text>
              <Text style={{ fontSize: 12, color: COLORS.darkPrimary }}>
                User Email : {userStore.data.email}
              </Text>
              <Text style={{ fontSize: 12, color: COLORS.darkPrimary }}>
                User Phone : {userStore.data.phone}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.darkPrimary,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                {message}
              </Text>
            </View>
            {expenses.length > 0 ? (
              <>
                {expenses.map((expense, index) => (
                  <View
                    style={{
                      flexDirection: "column",
                      border: 1,
                      borderRadius: 8,
                      padding: 8,
                      marginTop: 8,
                    }}
                  >
                    {/* <Text style={styles.snoStyle}>{index + 1}.</Text> */}
                    <View style={{ flexDirection: "row" }}>
                      <View>
                        <Text style={styles.nameStyle}>{expense.title}</Text>
                        <Text
                          style={[
                            styles.nameStyle,
                            { color: "gray", fontSize: 8 },
                          ]}
                        >
                          {expense.description}
                        </Text>
                      </View>
                      <Text style={styles.dateStyle}>
                        {moment(expense.date).format("DD/MM/YYYY")}
                      </Text>
                      <View>
                        <Text style={styles.categoryStyle}>
                          {expense.category.title}
                        </Text>
                        <Text style={styles.amountStyle}>
                          Rs.{expense.amount}
                        </Text>
                      </View>
                    </View>
                    <Text style={{ fontSize: 8, color: COLORS.primary }}>
                      {expense.meta.url}
                    </Text>
                    {/* <a href={expense.meta.url} download="test.pdf">
                      Download
                    </a> */}
                  </View>
                ))}
              </>
            ) : (
              <View style={{ width: 500, padding: 8 }}>
                <Text style={{ textAlign: "center", marginTop: 10 }}>
                  No Expenses Found
                </Text>
              </View>
            )}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PDFDocument;
