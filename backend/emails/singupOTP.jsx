import React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export default function SignupOTP({ username, otp }) {
  return (
    <Html>
      <Head />
      <Preview>{otp} - is your BiteBox verification code</Preview>

      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto max-w-140 overflow-hidden rounded-2xl bg-white shadow-lg">
            {/* Header OF THE EMAIL */}
            <Section className="bg-orange-500 px-10 py-5 text-center">
              <Heading className="m-0 text-4xl font-extrabold tracking-wide text-white">
                BiteBox
              </Heading>

              <Text className="mt-3 mb-0 text-white text-base">
                The Home of Deliciousness
              </Text>
            </Section>

            {/* Content */}
            <Section className="px-5 py-4">

              {/* GREETING USER */}
              <Heading className="m-0 text-lg font-bold text-gray-900">
                Hello {username},
              </Heading>

              {/* FIRST PARA OF THE EMAIL  */}
              <Text className="mt-1 text-sm leading-5 text-gray-600">
                Thank you for creating your BiteBox account.Use the verification
                code below to complete your signup process.
              </Text>

              {/* OTP CONTAINER */}
              <Section className="my-4 rounded-xl border-2 border-dashed border-orange-300 bg-orange-50 pt-5 text-center">
                <Text className="m-0 text-sm uppercase tracking-[4px] text-gray-500">
                  Verification Code
                </Text>

                <Heading className="mt-3 mb-0 text-5xl font-extrabold tracking-[10px] text-orange-600">
                  {otp}
                </Heading>
                <Text className="mt-4 text-center text-md font-medium text-gray-400">
                  This code expires in 5 minutes.
                </Text>
              </Section>

              {/* LAST PARA OF THE EMAIL */}
              <Text className="text-sm leading-5 text-gray-500">
                If you didn't request for code, you can safely ignore this
                email. No changes will be made to your account.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t bg-gray-50 px-8 py-2 text-center">
              <Text className="m-0 text-sm text-gray-500">
                Thank you for choosing
              </Text>

              <Heading className="mt-2 mb-0 text-2xl font-bold text-orange-500">
                BiteBox
              </Heading>

              <Text className="mt-2 text-xs text-orange-400">
                Fast • Fresh • Delicious
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
