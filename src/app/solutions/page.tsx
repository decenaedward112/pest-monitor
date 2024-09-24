"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { unserialize } from "php-serialize";
import PredictionGraph from "@/components/PredictionGraph";
import { useState } from "react";
import YieldLossGraph from "@/components/YieldLossGraph";
import Loading from "@/components/Loading";

const formSchema = z.object({
  city: z.string().min(4, { message: "Enter a valid city" }),
  countryCode: z.string().min(2, { message: "Enter a valid country code" }),
  cropAge: z.coerce.number().min(1, { message: "Enter a valid crop age" }),
  cropGen: z.coerce
    .number()
    .min(1, { message: "Enter a valid crop generation" }),
  area: z.coerce.number().min(1, { message: "Enter a valid land area" }),
});

const Solutions = () => {
  const [pred, setPred] = useState<any>();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const coordinates = await axios.get(
        "http://www.geoplugin.net/extras/forward_place.gp",
        {
          params: {
            place: values.city,
            country: values.countryCode,
          },
        }
      );
      const parsedCoordinates = await unserialize(`${coordinates.data}`);

      const weather = await axios.get(
        "https://api.open-meteo.com/v1/forecast",
        {
          params: {
            latitude: parsedCoordinates[0].geoplugin_latitude,
            longitude: parsedCoordinates[0].geoplugin_longitude,
            current: "temperature_2m,relative_humidity_2m,rain",
            past_days: 1,
            models: "metno_seamless",
          },
        }
      );
      const inputData = {
        crop_age_in_days: values.cropAge,
        crop_generation: values.cropGen,
        field_area_in_hectares: values.area,
        temperature_celsius: weather.data.current.temperature_2m,
        relative_humidity_percent: weather.data.relative_humidity_2m,
        rainfall_mm: weather.data.rain,
      };
      const prediction = await axios.post(
        "http://192.168.1.118:5000/predict",
        inputData
      );
      setPred(prediction.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="flex flex-col  flex-1 gap-20">
        <div>
          <p className="text-[#121b0e] tracking-light text-[32px] font-bold leading-tight min-w-72 mb-3">
            Rice field pest prediction
          </p>
          <div className="flex gap-20">
            <div className=" w-1/2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Tuguegarao City"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="countryCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country Code</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. PH" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cropAge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Crop Age</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 1"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cropGen"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Crop Generation</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 1"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Land Area</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 1"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="bg-primary flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#5de619] text-[#121b0e] text-sm font-bold leading-normal tracking-[0.015em]">
                    <span className="truncate">Predict</span>
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {pred && (
              <PredictionGraph
                title="Pest Incidence Prediction Per Hour"
                xAxis={pred.pest_incidence_per_hour.x_axis}
                yAxis={pred.pest_incidence_per_hour.y_axis}
                scale={[0, 500, 1000, 1500, 2000, 2500, 3000, 3500]}
              />
            )}
            {pred && (
              <PredictionGraph
                title="Pest Incidence Prediction Per Hour"
                xAxis={pred.pest_incidence_per_day.x_axis}
                yAxis={pred.pest_incidence_per_day.y_axis}
                scale={[0, 25, 50, 75, 100, 125, 150]}
              />
            )}
            {pred && (
              <YieldLossGraph
                actualYieldLoss={
                  pred.actual_vs_predicted_yield_loss.actual_yield_loss_percent
                }
                predictedYieldLoss={
                  pred.actual_vs_predicted_yield_loss
                    .predicted_yield_loss_percent
                }
                xAxis={pred.actual_vs_predicted_yield_loss.x_axis}
                title="Actual Yield Loss vs Predicted Yield Loss"
                scale={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90]}
                error={pred.mean_absolute_error_yield.toFixed(2)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Solutions;
