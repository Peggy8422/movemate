import { NextResponse } from 'next/server';
import taiwanCityDistrictRoads from '@/public/json/taiwan_city_district_road.json';

export async function GET() {
  return NextResponse.json(taiwanCityDistrictRoads);
}
