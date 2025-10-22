import { Link } from "expo-router"
import { Text, View } from "react-native"

export default function Page() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
      <Text>register</Text>
      <Link href="/login" replace>
        <Text>login to existing account</Text>
      </Link>
    </View>
  )
}