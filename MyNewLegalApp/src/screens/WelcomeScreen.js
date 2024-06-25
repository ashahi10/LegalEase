import React from 'react';
import { View, Text, StyleSheet, Button, TextInput, ScrollView, Image, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FamilyLawIcon from '../../assets/family-law.png';
import CriminalLawIcon from '../../assets/crime-law.png';
import BusinessLawIcon from '../../assets/business-law.png';
import EmploymentLawIcon from '../../assets/employment-law.png';
import PersonalInjuryIcon from '../../assets/injury-law.png';
import RealEstateIcon from '../../assets/real estate.png';
import ImmigrationIcon from '../../assets/immigration-law.png';
import TaxIcon from '../../assets/Tax-law.png';
import EstatePlanningIcon from '../../assets/estate-law.png';
import BankruptcyIcon from '../../assets/bankrupt-law.png';
import EnvironmentIcon from '../../assets/environment-law.png';
import  { useState, useEffect } from 'react';

function WelcomeScreen({ route, navigation }) {
    const name = route.params?.name;
    const [lawyers, setLawyers] = useState([]); // State to store lawyer data
    useEffect(() => {
        fetch('http://localhost:8081/api/lawyers/random')  // Make sure URL is correct
          .then(response => response.json())
          .then(data => {
            //console.log(data);  // Check what data you received
            setLawyers(data);
          })
          .catch(error => {
            console.error('Failed to fetch lawyers:', error);
            setLawyers([]);  // Ensure lawyers is always an array
          });
      }, []);

    const categories = [
      { name: "Family ", color: "#9CAFEE",icon: FamilyLawIcon },
      { name: "Criminal ", color: "#FFD700", icon: CriminalLawIcon},
      { name: "Business ", color: "#20B2AA", icon: BusinessLawIcon},
      { name: "Employment ", color: "#778899", icon: EmploymentLawIcon},
      { name: "Personal Injury ", color: "#FF6347", icon: PersonalInjuryIcon},
      { name: "Real Estate ", color: "#4682B4", icon: RealEstateIcon},
      { name: "Immigration ", color: "#32CD32", icon: ImmigrationIcon },
      { name: "Tax ", color: "#FFA500", icon: TaxIcon },
      { name: "Estate Plan", color: "#6A5ACD", icon: EstatePlanningIcon},
      { name: "Bankruptcy ", color: "#FF4500", icon: BankruptcyIcon},
      { name: "Environment ", color: "#2E8B57", icon: EnvironmentIcon},
  ];
 
  return (
    <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Welcome, {name}!</Text>
                <View style={styles.icons}>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                    <View style={styles.spacer} />
                    <Ionicons name="settings-outline" size={24} color="black" />
                </View>
            </View>
            <ScrollView style={{ flex: 1 }}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search..."
                placeholderTextColor="#888"
            />
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
                    {categories.map((category, index) => (
                        <View key={index} style={[styles.categoryCard, {backgroundColor: category.color}]}>
                        <Image source={category.icon} style={styles.categoryIcon} />
                            <Text style={styles.categoryText}>{category.name}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.featuredLawyersSection}>
                <Text style={styles.sectionTitle}>Featured Best</Text>  
                {lawyers && lawyers.length > 0 ? (
                lawyers.map((lawyer, index) => (
                <View key={index} style={styles.lawyerCard}>
                <Image source={{ uri: lawyer.PhotoURL }} style={styles.lawyerImage} />
                <View style={styles.lawyerInfo}>
                 <Text style={styles.lawyerName}>{lawyer.FirstName} {lawyer.LastName}</Text>
                    <Text style={styles.lawyerSpecialization}>{lawyer.Specialization}</Text>
                <Text style={styles.lawyerDescription}>{lawyer.Experience}</Text>
            </View>
        </View>
      ))
    ) : (
      <Text>No lawyers found</Text>
    )}
  
    </View>     
        </ScrollView>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 16,
      paddingTop: 70,
      backgroundColor: '#fff',
  },
  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
  },
  welcomeText: {
      fontSize: 30,
      fontWeight: 'bold',
  },
  icons: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  icon: {
      marginRight: 16,
  },
  spacer: {
        width: 1, // Space between the icons
    },
  searchBar: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 8,
      height: 40,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1,
      elevation: 2,
  },
  section: {
        flex: 1,
        marginBottom: 16,
        marginTop: 16,
        overflow: 'hidden'
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    categories: {
        flexDirection: 'row',
    },
    categoryCard: {
        width: 100,
        height: 100,
        backgroundColor: '#9CAFEE', // Light color background
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16, // Space between cards
    },
    categoryIcon: {
        width: 50,  // Adjust size as needed
        height: 50,  // Adjust size as needed
        marginBottom: 8,
    },
    categoryText: {
        fontSize: 16,
        textAlign: 'center',
        
    },
    featuredLawyersSection: {
    flex: 1,
    marginBottom: 16,
    marginTop: 3, // Reduced top margin specifically for this section
    overflow: 'hidden',
    //backgroundColor: 'red'
    
    },

    lawyerCard: {
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    lawyerImage: {
        width: 100,
        height:100,
        borderRadius: 40,
        overflow: 'hidden',
    },
    lawyerInfo: {
        flex: 1,
        paddingLeft: 10,
    },
    lawyerName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    lawyerSpecialization: {
        fontSize: 16,
        color: '#666',
    },
    lawyerDescription: {
        fontSize: 14,
        color: '#999',
    },
});

export default WelcomeScreen;
